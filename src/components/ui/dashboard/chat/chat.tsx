import Link from "next/link"
import Image from "next/image"
import ChatRefresh from "./chat-refresh"
import { Button } from "@/components/ui/button"
import MessageRenderer from "./message-renderer"
import { sendMessage } from "@/app/api/chat/route"
import DashboardNav from "@/components/ui/dashboard/dashboard-nav"
import { RiChat3Line, RiMessage2Line, RiSendPlane2Fill } from "@remixicon/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/dashboard/avatar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/dashboard/input-group"
import { Badge } from "../../landing/badge"

export default function Chat({ chat, messages, session, repo }: { chat: any, messages: any[], session: any, repo: any }) {
  return (
    <main className="flex h-full flex-col bg-linear-to-br from-background to-card rounded-xl">
      <DashboardNav searchBar={false}
        title={
          <div className="flex items-center gap-2 text-muted-foreground">
            <RiChat3Line className="h-4 w-4" />
            <span className="flex flex-row">
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Workspace</Link>
              <span className="text-border mx-1">/</span> 
              <span className="text-foreground font-medium">
                {chat?.title}
              </span>
            </span>
          </div>
        }
        action={repo ? <Badge>{repo.repositoryName}</Badge> : <Badge>No Repo Attached</Badge>} />

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start" }`} >
            {message.role === "user" ? (
              <div className="flex max-w-[75%] items-center gap-2">
                <div className="rounded-xl bg-primary-foreground px-4 py-3">
                  {message.content}
                </div>

                <Avatar className="h-8 w-8 rounded-full shrink-0">
                  <AvatarImage src={session?.user?.image || undefined} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex flex-row items-start gap-2 max-w-[75%] p-4 rounded-lg">
                <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="mt-1" />
                <MessageRenderer content={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>

      <form action={async (formData) => { "use server"; await sendMessage(chat?.id!, formData) }} className="scroll-rounded-b-none sticky bottom-0 p-4 rounded-b-xl border-t border-border bg-background/5 backdrop-blur-md shadow-xl">
        <InputGroup className="h-12 w-full">
          <InputGroupInput name="prompt" placeholder="Give me anything..." />

          <InputGroupAddon><RiMessage2Line /></InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button type="submit"><RiSendPlane2Fill /></Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </main>
  )
}