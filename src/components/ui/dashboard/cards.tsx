import React from "react"
import Link from "next/link"
import prisma from "@lib/prisma"
import { auth } from "@/auth"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"

export default async function Cards({ session }: { session?: any }) {
  const userId = session?.user?.id

  const [repositories, keys, chats] = await prisma.$transaction([
    prisma.repository.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
    prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
    prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 2,
    }),
  ])

  const cardConfig = [
    {
      title: "Your Projects",
      data: repositories,
      emptyMsg: "No repositories yet. Add one to get started.",
      renderItem: (repo: any) => (
        <div key={repo.id} className="text-sm">
          <p className="font-medium truncate">{repo.repositoryName}</p>
          <p className="text-xs text-muted-foreground">
            Indexed at {repo.dateIndexed && new Date(repo.dateIndexed).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      title: "API Keys",
      data: keys,
      emptyMsg: "No API keys yet.",
      renderItem: (key: any) => (
        <div key={key.id} className="text-sm">
          <p className="font-medium truncate">{key.name}</p>
          <p className="text-xs text-muted-foreground">
            {key.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      ),
    },
    {
      title: "Recent Chats",
      data: chats,
      emptyMsg: "No chats yet. Start a new conversation.",
      renderItem: (chat: any) => (
        <div key={chat.id} className="text-sm">
          <p className="font-medium truncate">{chat.title}</p>
          <p className="text-xs text-muted-foreground">
            Updated {new Date(chat.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {cardConfig.map((config) => (
        <Card key={config.title}>
          <CardHeader className="-mb-4">
            <CardTitle>{config.title}</CardTitle>
            <CardAction>[{config.data.length}]</CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            {config.data.length === 0 ? (
              <p className="text-sm text-muted-foreground">{config.emptyMsg}</p>
            ) : (
              config.data.map((item: any) => config.renderItem(item))
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}