import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Dashboard from '@/components/ui/dashboard/dashboard'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main>
      <Dashboard />
    </main>
  )
}