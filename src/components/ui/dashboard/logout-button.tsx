"use client"

import { signOut } from "next-auth/react"
import { DropdownMenuItem } from "@/components/ui/dashboard/dropdown-menu"
import { RiLogoutBoxLine } from "@remixicon/react"

export default function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <RiLogoutBoxLine />
      Log Out
    </DropdownMenuItem>
  )
}