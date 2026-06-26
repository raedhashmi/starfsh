import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function embed(text: string) {
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  })

  return result.data[0].embedding
}