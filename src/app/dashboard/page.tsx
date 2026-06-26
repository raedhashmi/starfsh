import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Dashboard from '@/components/ui/dashboard/dashboard'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main className="rounded-xl bg-radial from-border to-background">
      <Dashboard session={session}/>
    </main>
  )
}