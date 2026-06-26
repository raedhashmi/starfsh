import React from "react"
import Cards from "./cards"
import prisma from "@lib/prisma"
import UsageChart from "./usage-chart"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import DashboardNav from "@/components/ui/dashboard/dashboard-nav";
import { RiDashboardFill } from "@remixicon/react"
import Link from "next/link"

export default async function DashboardLayout({ session }: { session?: any }) {
  const userId = session?.user?.id
  const keys = await prisma.apiKey.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <>
      <DashboardNav title={
        <div className="flex items-center gap-2 text-muted-foreground">
            <RiDashboardFill className="h-4 w-4" />
            <span>
              <span className="text-border mx-1 mr-2">/</span> 
              <span className="text-foreground font-medium">Overview</span>
            </span>
          </div>
      } searchBar={true}/>

      <main className="p-4 px-6">
        <div className="flex flex-row m-4 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl">Welcome, {session?.user?.name}</h1>
            <p className="text-foreground/70">See what's happening</p>
          </div>
          <Avatar className="h-15 w-15 rounded-full">
            <AvatarImage src={session?.user?.image || undefined} />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <Cards session={session}/>
        <UsageChart keys={keys}/>
      </main>
    </>
  )
}