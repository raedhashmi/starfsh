import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@lib/prisma'
import { redirect } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { indexRepository } from "@lib/repo-index"
import DashboardNav from '@/components/ui/dashboard/dashboard-nav'
import { RiFolderAddFill, RiGithubFill, RiSearch2Line } from '@remixicon/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/dashboard/input-group'

async function importProject(session: any, formData: FormData) {

  const repoName = formData.get('name')
  const repoUrl = formData.get('repo')


  const repo = await prisma.repository.create({
    data: {
      userId: session.user.id,
      repositoryName: repoName as string,
      repositoryLink: repoUrl as string,
    },
  })

  await indexRepository({
    repoUrl: repo.repositoryLink,
    repositoryId: repo.id,
    userId: session.user.id,
  })

  redirect("/dashboard/projects")
}

export default async function NewProject() {
  const session = await auth()
  
  if (!session || !session.user || !session.user.id) redirect('login')
  return (
    <main className='flex flex-col h-full gap-6'>
      <DashboardNav searchBar={false} title={
        <div className="flex items-center gap-2 text-muted-foreground">
            <RiFolderAddFill className="h-4 w-4" />
            <span>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Workspace</Link>
              <span className="text-border mx-1">/</span> 
              <span className="text-foreground font-medium">New Projects</span>
            </span>
          </div>
      }/>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Add a Project</h1>
          <p className="text-muted-foreground mt-2">Import a GitHub repository to unlock code-aware AI assistance.</p>
        </div>
        
        <Card className="w-full max-w-3xl border-border/50 shadow-xl">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <RiGithubFill className="size-8 text-primary" />
              </div>

              <div>
                <CardTitle className="text-3xl">Import Repository</CardTitle>
                <p className="text-sm text-muted-foreground">Connect a GitHub repository and let Starfsh index your codebase for AI-powered search and chat.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => { 'use server'; await importProject(session, formData) }} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label>Display Name *</Label>

                <InputGroup>
                  <InputGroupInput required={true} name="name" placeholder="Starfsh" />
                  <InputGroupAddon><RiFolderAddFill /></InputGroupAddon>
                </InputGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="repo">Repository URL *</Label>

                <InputGroup>
                  <InputGroupInput required={true} name="repo" placeholder="https://github.com/raedhashmi/starfsh" />
                  <InputGroupAddon><RiGithubFill /></InputGroupAddon>
                </InputGroup>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" type="button">Cancel</Button>
                <Button type="submit"><RiSearch2Line /> Import Repository</Button>
              </div>
              
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
