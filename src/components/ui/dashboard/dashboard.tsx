import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto p-6">

        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-semibold">
              Dashboard
            </h1>
            <p className="text-sm text-foreground/60">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>

          <form
            action={async () => {
              "use server"
              const { signOut } = await import("@/auth")
              await signOut({ redirectTo: "/login" })
            }}
          >
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-muted text-sm">
              Sign out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-sm text-foreground/60">User ID</p>
            <p className="text-xs break-all mt-1">
              {session.user.id || "Not available"}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-sm text-foreground/60">Email</p>
            <p className="text-sm mt-1">
              {session.user.email}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-sm text-foreground/60">Status</p>
            <p className="text-sm mt-1 text-green-500">
              Authenticated
            </p>
          </div>

        </div>

        <div className="mt-6 p-4 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-medium">Quick Actions</h2>

          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <button className="p-3 rounded-lg border border-border hover:bg-muted text-left">
              Create new repository index
            </button>

            <button className="p-3 rounded-lg border border-border hover:bg-muted text-left">
              Start new chat session
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}