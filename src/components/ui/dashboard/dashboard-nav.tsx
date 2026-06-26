import React from 'react'
import { RiSearch2Line } from "@remixicon/react"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/dashboard/input-group"

export default function DashboardNav({ title, searchBar = true, action = null }: { title: React.ReactNode, searchBar?: boolean, action?: React.ReactNode })  {
  return (
    <nav className="scroll-rounded-t-none flex sticky z-100 top-0 inset-x-0 px-8 h-15 rounded-t-xl items-center justify-between border border-border bg-background/5 backdrop-blur-md shadow-xl">
      <span className="text-xl font-semibold text-foreground/80">
        {title}
      </span>
      
      <div className='flex flex-row items-center gap-4'>
        {action}
        {searchBar && (
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <RiSearch2Line />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              ⌘K
            </InputGroupAddon>
          </InputGroup>
        )}
      </div>
    </nav>
  )
}
