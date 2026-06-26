import React from "react"
import {
  RiBook2Line,
  RiCodeBoxLine,
  RiLightbulbLine,
  RiChat3Line,
  RiHistoryLine,
  RiFolder3Fill,
  RiKey2Line,
  RiBarChartLine,
  RiSettingsLine,
  RiBankCardLine,
  RiDashboardFill,
} from "@remixicon/react"
import Link from "next/link"
import { auth } from "@/auth"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/dashboard/sidebar"
import LogoutButton from "./logout-button"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dashboard/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/dashboard/avatar"

export default async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth()

  const name = session?.user?.name
  const email = session?.user?.email
  const image = session?.user?.image

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary-foreground/40 mb-4 rounded-lg">
        <div className="flex flex-row group-data-[state=collapsed]:px-0 px-4 group-data-[state=collapsed]:py-0 py-1 gap-2 items-center">
          <Image alt='logo' className="group-data-[state=collapsed]:size-8 ml-0.5 size-10" src={'/favicon.ico'} width={4} height={4}></Image>
            <div className="flex text-2xl space-x-px items-center group-data-[state=collapsed]:hidden">
              <span className='font-light text-foreground/80'>star</span>
              <span className="font-extrabold bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-transparent">fsh</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="group-data-[state=collapsed]:flex group-data-[state=collapsed]:items-center" >
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
              <SidebarMenuItem>
                  <SidebarMenuButton><RiBook2Line /> Getting Started</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton><RiCodeBoxLine /> API Refrence</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton><RiLightbulbLine />Examples</SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/">
                    <RiDashboardFill />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/chat/">
                    <RiChat3Line />
                    <span>New Thread</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/chat/recents">
                    <RiHistoryLine />
                    <span>Recent Chats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/projects">
                    <RiFolder3Fill />
                    <span>Manage Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Developer</SidebarGroupLabel>
          <SidebarGroupContent>
              <SidebarMenuItem>
                  <SidebarMenuButton><RiKey2Line /> API Keys</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton><RiBarChartLine /> Usage</SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="mb-2">
          <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src={image || undefined} />
                      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">{email}</p>
                    </div>
                  </SidebarMenuButton >
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="right" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={image || undefined} />
                        <AvatarFallback className="rounded-lg">{name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm text-accent-foreground leading-tight">
                        <span className="truncate font-medium">{name}</span>
                        <span className="truncate text-xs">{email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem><RiSettingsLine /> Settings</DropdownMenuItem>
                    <DropdownMenuItem><RiBankCardLine /> Billing</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                   <LogoutButton />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
