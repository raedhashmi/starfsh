import React from 'react'
import { Skeleton } from "@/components/ui/dashboard/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  // We create an array of 3 items to match our 3 cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-6">
      {[1, 2, 3].map((index) => (
        <Card key={index} className="h-70 flex flex-col justify-between border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
          <CardHeader className="space-y-2">
            {/* Icon and Title skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 justify-center pt-4">
            {/* List item skeletons */}
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-[90%] rounded" />
            <Skeleton className="h-4 w-[75%] rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
