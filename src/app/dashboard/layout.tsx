import "../globals.css";
import AppSidebar from "@/components/ui/dashboard/dashboard-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/dashboard/sidebar"
import React from "react";

export const metadata = {
  title: "starfsh - Dashboard",
  description:
    "Manage your projects, keys, and take a glimpse of the situation happening.",
  metadataBase: new URL("https://starfsh.lrdevstudio.com/dashboard"),
  openGraph: {
    title: "starfsh",
    description: "AI-powered GitHub repository intelligence tool",
    url: "https://starfsh.lrdevstudio.com/dasboard",
    siteName: "starfsh",
    type: "website",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <AppSidebar variant="inset"/>

        <SidebarInset>
          {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
