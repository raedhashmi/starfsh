export function parseRepoUrl(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)

  if (!match) {
    throw new Error("Invalid GitHub URL")
  }

  return {
    owner: match[1],
    repo: match[2].replace(".git", ""),
  }
}

export async function getRepoTree(repoUrl: string) {
  const { owner, repo } = parseRepoUrl(repoUrl)
  

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }
  )

  if (!res.ok) {
    throw new Error(`GitHub API Error ${res.status}`)
  }

  const data = await res.json()

    const ignored = [
      // --- Package Manager Directories ---
      "node_modules/",      // JS/TS
      "vendor/",            // PHP / Go / Ruby
      ".gradle/",           // Java/Kotlin cache
      ".bundle/",           // Ruby bundle config
      
      // --- Virtual Environments & Dependencies ---
      "venv/",              // Python
      ".venv/",             // Python
      "env/",               // Python
      "site-packages/",     // Python
      "poetry.lock",        // Python Poetry lockfile
      "pnpm-lock.yaml",     // JS pnpm lockfile
      "package-lock.json",  // JS npm lockfile
      "yarn.lock",          // JS yarn lockfile
      "composer.lock",      // PHP lockfile
      "gemfile.lock",       // Ruby lockfile
      "cargo.lock",         // Rust lockfile

      // --- Build, Output & Cache Directories ---
      ".next/",             // Next.js build
      ".nuxt/",             // Nuxt.js build
      "dist/",              // General build
      "build/",             // General build
      "target/",            // Rust / Maven build
      "bin/",               // .NET / Java build
      "obj/",               // .NET intermediate build
      "out/",               // General output
      ".cache/",            // Bundler caches
      "__pycache__/",       // Python bytecode
      ".pytest_cache/",     // Python test cache
      ".sass-cache/",       // Sass cache
      ".eslintcache",       // ESLint cache
      "src/generated",
      
      // --- IDE, OS, & Version Control ---
      ".git/",              // Git folder
      ".github/",           // GitHub workflows (usually config, not source code)
      ".vscode/",           // VS Code settings
      ".idea/",             // JetBrains settings
      ".ds_store",          // macOS metadata
      "thumbs.db",          // Windows metadata
      
      // --- Environment & Database Files ---
      ".env",               // Env files (catches .env, .env.local, .env.development)
      "*.db",               // SQLite / local databases
      "*.sqlite",           // SQLite databases

      // --- Media & Binary Extensions (Optional but highly recommended) ---
      // Since your filter looks for "blob", GitHub includes images/pdfs. 
      // If you only want text/code, ignore these common binary extensions:
      ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", // Images
      ".mp4", ".mov", ".avi", ".webm",                          // Videos
      ".mp3", ".wav", ".flac",                                  // Audio
      ".pdf", ".zip", ".tar", ".gz", ".rar", ".7z",             // Docs & Archives
      ".exe", ".dll", ".so", ".dylib"                           // Compiled Binaries
    ]

  
  return data.tree.filter((item: any) => {
    if (item.type !== "blob") return false

    const path = item.path.toLowerCase()

      return data.tree.filter((item: any) => {
    if (item.type !== "blob") return false

    const path = item.path.toLowerCase()

    return !ignored.some(dir => {
        if (dir.endsWith('/')) return path.includes(dir) || path.startsWith(dir);

        return path.endsWith(dir) || path.includes("/" + dir);
      })
    })

  })
}

export async function getRawFile( owner: string, repo: string, path: string ) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`

  const res = await fetch(url)

  if (!res.ok) return null

  return res.text()
}