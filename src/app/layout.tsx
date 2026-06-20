import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/dashboard/tooltip"
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata = {
  title: "starfsh",
  description:
    "Analyze, refactor, and document GitHub repositories using AI. starfsh scans your codebase and helps you regenerate, improve, and understand it instantly.",
  metadataBase: new URL("https://starfsh.lrdevstudio.com"),
  openGraph: {
    title: "starfsh",
    description: "AI-powered GitHub repository intelligence tool",
    url: "https://starfsh.lrdevstudio.com",
    siteName: "starfsh",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={cn("h-full", "antialiased", "font-sans")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
