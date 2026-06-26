import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@lib/prisma'
import { index } from "@lib/vector"
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RiFolder3Fill, RiFunctionAddFill } from "@remixicon/react"
import DashboardNav from '@/components/ui/dashboard/dashboard-nav'

export default async function Projects() {
  const session = await auth()
  if (!session || !session.user || !session.user.id) redirect('/login')

  const projects = await prisma.repository.findMany({
    where: { userId: session?.user?.id }
  })

  async function deleteProj(proj: any) {
    'use server'

    if (!proj || !proj.id) return
    
    await index.deleteMany({
      filter: {
        repositoryId: { "$eq": proj.id },
      },
    })

    await prisma.repository.delete({
      where: {
        id: proj.id,
      },
    })
    
    redirect('/dashboard/projects/')
  }

  return (
    <main className='flex flex-col h-full bg-radial from-card to-background'>
      <DashboardNav searchBar={true} title={
        <div className="flex items-center gap-2 text-muted-foreground">
            <RiFolder3Fill className="h-4 w-4" />
            <span>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Workspace</Link>
              <span className="text-border mx-1">/</span> 
              <span className="text-foreground font-medium">Manage Projects</span>
            </span>
          </div>
      } action={ <Link href={'/dashboard/projects/new/'}><RiFunctionAddFill /></Link> }/>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6'>
        {projects.length === 0 ? (
          <div className="flex flex-col col-span-3 items-center justify-center py-32 text-center">
            <RiFolder3Fill className="size-12 text-muted-foreground mb-4" />

            <h2 className="text-xl font-semibold">No Projects Yet</h2>
            <p className="text-muted-foreground mt-2 max-w-md">Import your first GitHub repository and let Starfsh learn your codebase.</p>

            <Link href="/dashboard/projects/new" className="mt-6">
              <Button><RiFunctionAddFill /> Add Project</Button>
            </Link>
          </div>
        ) : (
          projects.map(project => (
            <article key={project.id} className="group rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {project.repositoryName}
                    </h2>

                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <RiFolder3Fill className="size-5 text-primary" />
                </div>

                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {project.summaryText || "No summary available."}
                </p>

                <div className="flex gap-2 mt-5">
                  <a
                    href={project.repositoryLink ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-2xl border border-border hover:bg-accent text-sm"
                  >
                    Repository
                  </a>
                  <form action=""><Button formAction={deleteProj.bind(null, project)} variant={'destructive'}>Delete</Button></form>

                  {project.pagesIoLink && (
                    <a
                      href={project.pagesIoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg border border-border hover:bg-accent text-sm"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  )
}
