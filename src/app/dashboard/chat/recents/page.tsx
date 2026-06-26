import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/ui/dashboard/dashboard-nav'
import { RiChat3Line, RiHistoryLine, RiDeleteBin6Line } from '@remixicon/react'

export default async function RecentChats() {
  const session = await auth()
  if (!session || !session.user || !session.user.id) redirect('/login')
  const chats = await prisma.chat.findMany({ where: { userId: session?.user?.id } })

  // 1. Next.js passes bound arguments as the first parameters of the action
  async function deleteChat(chat: any) {
    'use server'

    if (!chat || !chat.id) return
    
    await prisma.chat.delete({
      where: { id: chat.id }
    })
    
    redirect('/dashboard/chat/recents/')
  }

  return (
    <main className='flex flex-col h-full rounded-xl bg-radial from-card to-background font-sans'>
      <DashboardNav searchBar={true} title={
        <div className="flex items-center gap-2 text-muted-foreground">
          <RiHistoryLine className="h-4 w-4" />
          <span>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Workspace</Link>
            <span className="text-border mx-1">/</span> 
            <span className="text-foreground font-medium">Recent Chats</span>
          </span>
        </div>
      }/>

      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <RiHistoryLine className="size-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No Chats Yet</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Get started with with a New Thread and explore the capabilities of starfish.
          </p>
          <Link href="/dashboard/chat/" className="mt-6">
            <Button><RiChat3Line className="mr-2 h-4 w-4" /> New Thread</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-6 overflow-y-auto">
          {chats.map(chat => (
            <div key={chat.id} className='flex items-center  p-4 justify-between rounded-xl border border-border hover:bg-muted transition-colors cursor-pointer'>
              <Link href={`/dashboard/chat/${chat.id}`} className="flex flex-row items-center gap-3">
                <RiChat3Line className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{chat.title || 'Untitled Chat'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(chat.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>

              <form>
                <Button variant="destructive" size="icon" formAction={deleteChat.bind(null, chat)}>
                  <RiDeleteBin6Line className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
