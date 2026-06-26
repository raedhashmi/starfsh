"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/dashboard/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/dashboard/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card"
import prisma from "@lib/prisma"

export default function UsageChart({ keys }: { keys?: any }) {

  const getFormattedDate = (daysOffset: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const date = String(d.getDate()).padStart(2, '0')
    return `${date}-${month}`
  }

  const chartData = Array.from({ length: 14 }, (_, i) => {
    const row: Record<string, string | number> = {
      day: getFormattedDate(i - 13),
    }

    keys.forEach((key:any) => {
      row[key.id] = Math.floor(Math.random() * 400 + 50)
    })

    return row
  })

  const chartConfig = Object.fromEntries(
    keys.map((key:any, index:any) => [
      key.id,
      {
        label: key.name,
        color: `var(--chart-${(index % 5) + 1})`,
      },
    ])
  ) satisfies ChartConfig
  
  return (
    <Card className="my-6">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl">Your Usage</CardTitle>
        <CardDescription>Showing last 2 weeks</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="usage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}></stop>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={1}></stop>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={true} minTickGap={32} tickMargin={8}  axisLine={true} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            {keys.map((key:any, index:any) => (
              <Area
                key={key.id}
                dataKey={key.id}
                type="monotone"
                fill={`var(--chart-${(index % 5) + 1})`}
                stroke={`var(--chart-${(index % 5) + 2})`}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}