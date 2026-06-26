import { auth } from "@/auth"
import prisma from "@lib/prisma"
import { notFound, redirect } from "next/navigation"
import Chat from "@/components/ui/dashboard/chat/chat"

export default async function Page({ params }: { params: Promise<{ chatId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return redirect("/login")
  const paramsChatId = (await params).chatId

  const [ chat, messages ] = await Promise.all([
    prisma.chat.findFirst({ where: { id: paramsChatId, userId: session.user.id } }),
    (await prisma.message.findMany({ where: { chatId: paramsChatId }, orderBy: { createdAt: "desc" }, take: 20 })).reverse()
  ])
  if (!chat) notFound()
  let repo
  if (chat.repositoryId) repo = await prisma.repository.findFirst({ where: { id: chat?.repositoryId as string } })

  return (
    <Chat chat={chat} messages={messages} session={session} repo={repo} />
  )
}