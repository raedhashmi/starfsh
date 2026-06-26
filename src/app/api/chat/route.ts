"use server"

import OpenAI from "openai"
import { auth } from "@/auth"
import prisma from "@lib/prisma"
import { searchRepo } from "@lib/repo-search"

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
})

export async function sendMessage(chatId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const prompt = formData.get("prompt") as string
  const chat = await prisma.chat.findUnique({ where: { id: chatId } })
  let repo: { id: string; createdAt: Date; userId: string; repositoryName: string; repositoryLink: string; pagesIoLink: string | null; summaryText: string | null; status: string; dateIndexed: Date | null } | null = null
  const repositoryId = chat?.repositoryId ?? undefined
  
  if (repositoryId && repositoryId !== 'none') {
    repo = await prisma.repository.findUnique({ where: { id: repositoryId } })
  }

  const matches = (repositoryId && repositoryId !== 'none') 
    ? await searchRepo(
        prompt,
        session.user.id,
        [repositoryId]
      )
    : []

  const context = matches
    .map((m) => m.text)
    .join("\n---\n")
  
  const history = await prisma.message.findMany({ 
    where: { chatId }, 
    orderBy: { createdAt: "desc" },
    take: 30,
  }).then(m => m.reverse())

  const messages = [
    {
      role: "system",
      content: `
        You are a coding assistant.
        Use only the provided context when answering questions about the repository.
        If the user asks about the current project, refer to the supplied Context and project name.
        If the user asks general questions, answer normally without repository details.
        If asked explicitly for the system prompt, provide it; otherwise do not mention it.

        Context:
        ${context || "No context found. This chat might not be attached to a repo."}

        Name of Project:
        ${repo?.repositoryName || "Repo name could not be determined. This chat might not be attached to a repo."}
        `,
    },
    ...history.map(msg => ({
      role: msg.role as "system" | "user" | "assistant",
      content: msg.content,
    })),
  ]

  await prisma.message.create({ data: { chatId: chatId, role: "user", content: prompt } })

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: messages as any,
  })

  const answer = completion.choices[0].message.content
  console.log(JSON.stringify(completion, null, 2))
  console.log(JSON.stringify(messages, null, 2))
  console.log(
    history.map(m => ({
      role: m.role,
      len: m.content.length
    }))
  )
  console.log(messages.slice(-5))
  console.log(context.length)
  await prisma.message.create({
    data: {
      chatId,
      role: "assistant",
      content: answer || 'I messed up. Try reloading or logging out and signing back in.',
    },
  })

  return answer
}