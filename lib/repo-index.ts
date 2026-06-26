import { index } from "@lib/vector"
import { chunkText } from "@lib/chunk"
import { embed } from "@lib/embeddings"
import { getRepoTree, getRawFile, parseRepoUrl } from "@lib/repo-tools"

export async function indexRepository({ repoUrl, repositoryId, userId }: { repoUrl: string, repositoryId: string, userId: string }) {
  const { owner, repo } = parseRepoUrl(repoUrl)
  const tree = await getRepoTree(repoUrl)

  const files = tree.slice(0, 200)

  for (const file of files) {
    const content = await getRawFile(
      owner,
      repo,
      file.path
    )

    if (!content) continue

    const chunks = chunkText(content)

    const vectors = await Promise.all(
      chunks.map(async (chunk, i) => ({
        id: `${repositoryId}-${file.path}-${i}`,
        values: await embed(chunk),
        metadata: {
          userId,
          repositoryId,
          repository: repo,
          path: file.path,
          text: chunk,
        },
      }))
    )

    await index.upsert({
      records: vectors,
    })
  }
}