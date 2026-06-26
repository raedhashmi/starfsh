import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RiAlertLine, RiArrowLeftLine, RiMessage3Line } from "@remixicon/react"

export default function ChatNotFound() {
  return (
    <main className="flex h-full flex-col bg-radial from-card to-background rounded-xl">
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">


        <div className="relative flex w-full max-w-sm flex-col items-center text-center">
          {/* Dashboard style status badge */}
          <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background shadow-xs">
            <RiAlertLine className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Core Content Typography */}
          <div className="mb-6 space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Conversation Missing
            </h1>
            <p className="text-sm text-muted-foreground max-w-70 mx-auto leading-normal">
              This chat session doesn't exist, has been permanently removed, or is inaccessible.
            </p>
          </div>

          {/* Action Alignment built with matching styles */}
          <div className="flex w-full gap-2.5">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full gap-1.5 h-10 text-sm">
                <RiArrowLeftLine className="h-4 w-4" />
                Go Back
              </Button>
            </Link>

            <Link href="/dashboard" className="flex-1">
              <Button className="w-full gap-1.5 h-10 text-sm font-medium">
                <RiMessage3Line className="h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
