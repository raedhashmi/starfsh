import { Button } from "@/components/ui/button"
import { RiFileCopyFill } from "@remixicon/react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function CodeBlock({ inline, className, children }: any) {
  const match = /language-(\w+)/.exec(className || "")
  const lang = match ? match[1] : ""

  return !inline && match ? (
    <div className="my-4 w-4xl rounded-xl border border-border bg-background/20">
      <div className="flex px-6 p-1 text-xs font-mono items-center justify-between border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 select-none">
        <span className="lowercase">{lang}</span>
        <Button variant="ghost"><RiFileCopyFill /></Button>
      </div>

      <div className="max-h-96 overflow-auto">
        <SyntaxHighlighter style={darcula} language={lang} PreTag="div" customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
          }} >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  ) : (
    <code className="text-sm bg-accent px-1.5 py-0.5 rounded-md font-mono">
      {children}
    </code>
  )
}