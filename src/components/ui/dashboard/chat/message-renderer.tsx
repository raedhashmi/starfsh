import ReactMarkdown from "react-markdown"
import CodeBlock from "./code-block"

const markdownComponents = {
  code: CodeBlock,

  h1: (props: any) => (
    <h1
      {...props}
      className="text-3xl font-bold mt-4 mb-2 text-foreground"
    />
  ),

  h2: (props: any) => (
    <h2
      {...props}
      className="text-2xl font-bold mt-3 mb-2 text-foreground"
    />
  ),

  h3: (props: any) => (
    <h3
      {...props}
      className="text-xl font-bold mt-2 mb-1 text-foreground"
    />
  ),

  h4: (props: any) => (
    <h4
      {...props}
      className="text-lg font-bold mt-2 mb-1 text-foreground"
    />
  ),

  h5: (props: any) => (
    <h5
      {...props}
      className="text-base font-bold mt-2 mb-1 text-foreground"
    />
  ),

  h6: (props: any) => (
    <h6
      {...props}
      className="text-sm font-bold mt-2 mb-1 text-foreground"
    />
  ),

  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-border pl-4 italic text-foreground my-2"
    />
  ),

  table: (props: any) => (
    <table {...props} className="border-collapse w-full my-2" />
  ),

  th: (props: any) => (
    <th
      {...props}
      className="border border-border px-2 py-1 bg-background text-foreground"
    />
  ),

  td: (props: any) => (
    <td
      {...props}
      className="border border-border px-2 py-1 text-foreground"
    />
  ),

  tr: (props: any) => (
    <tr {...props} className="even:bg-card" />
  ),

  ul: (props: any) => (
    <ul {...props} className="list-disc ml-6 my-1" />
  ),

  ol: (props: any) => (
    <ol {...props} className="list-decimal ml-6 my-1" />
  ),

  li: (props: any) => (
    <li {...props} className="my-0.5" />
  ),

  p: (props: any) => (
    <p {...props} className="my-1 text-foreground" />
  ),
}

export default function MessageRenderer({
  content,
}: {
  content: string
}) {
  return (
    <div>
      <ReactMarkdown components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}