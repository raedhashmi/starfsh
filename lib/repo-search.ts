import { index } from "@lib/vector"
import { embed } from "@lib/embeddings"

export async function searchRepo( query: string, userId: string, repositoryIds?: string[] ) {
  const vector = await embed(query)

  const filter: any = { userId }

  if (repositoryIds?.length) filter.repositoryId = { $in: repositoryIds }

  const results = await index.query({
    vector,
    topK: 8,
    includeMetadata: true,
    filter,
  })

  return results.matches?.map((m) => ({
    score: m.score,
    path: m.metadata?.path,
    text: m.metadata?.text,
  })) || []
}