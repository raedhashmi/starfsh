"use client"

import Link from 'next/link'
import { Input } from '../input'
import { Label } from '../label'
import { Button } from '../button'
import { Switch } from '../switch'
import React, { useState } from 'react'
import { RiGithubFill, RiGoogleFill, RiStarFill } from '@remixicon/react'

export default function LoginForm() {
  const [agreedTC, setAgreedTC] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptsMarketing: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving account data to Prisma:", formData)
  }

  return (
    <div className='flex flex-row overflow-x-hidden h-full w-full md:w-screen md:h-screen'>

      <div className='flex flex-col w-full p-8 text-foreground items-center justify-center'>
        <div className='text-xl mt-8'>
          <span className='font-light text-foreground/80'>star</span>
          <span className="font-extrabold bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-transparent">fsh</span>
          <h1 className='text-3xl font-semibold text-foreground/80'>Log <br /> in to your account</h1>
          <p className='text-sm text-foreground/70'>Welcome back!</p>
        </div>
        <div className='text-center mt-6'>
            <span className='text-xs tracking-wide uppercase text-foreground/30'>Continue with</span>
        </div>
        <div className='flex flex-row w-full mt-1 gap-2'>
          <div className='flex h-min w-1/2 p-2 rounded-xl bg-card/30 hover:bg-card/60 border border-border items-center justify-center gap-2 duration-300 transition-all'>
            <RiGithubFill />
            <span className='text-foreground/70 text-sm'>Github</span>
          </div>
          <div className='flex h-min w-1/2 p-2 rounded-xl bg-card/30 hover:bg-card/60 border border-border items-center justify-center gap-2 duration-300 transition-all'>
            <RiGoogleFill />
            <span className='text-foreground/70 text-sm'>Google</span>
          </div>
        </div>
        <div className="mt-6 w-full">
          <div className="flex items-center w-full">
            <div className="grow border-t border-border" />
            <span className="px-3 text-xs uppercase text-foreground/30 bg-background">Or continue with</span>
            <div className="grow border-t border-border" />
          </div>
        </div>
        <div className='flex flex-col w-full mt-1 py-4 space-y-3'>
          <div>
            <p className='text-sm text-foreground/70'>Username / Email: </p>
            <Input className='rounded-lg' type='text' placeholder='John Doe / example@domain.com'></Input>
          </div>
          <div>
            <p className='text-sm text-foreground/70'>Password: </p>
            <Input className='rounded-lg' type='password' placeholder='123456789'></Input>
          </div>

          <div className='flex flex-col'>
            <Button className='mt-2'>Get Started</Button>
            <span className='self-center text-sm mt-4'>New here? <Link href={'/register'} className='text-blue-400 hover:underline'>Get started!</Link></span>
          </div>
        </div>
      </div>

      <div className='hidden md:flex md:flex-col justify-betwen p-16 w-4/3 h-full bg-linear-to-br from-border to-primary-foreground'>
        <div className="inline-flex max-w-fit items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-border bg-card/60 text-foreground/60 backdrop-blur-md z-10">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Active Workspace Session
        </div>

        <div className="my-auto max-w-md w-full mx-auto flex flex-col gap-4 z-10 font-mono text-xs">
          
          <div className="border border-border bg-card/40 backdrop-blur-md p-4 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between text-foreground/40 border-b border-border/40 pb-2 text-[10px]">
              <span>starfsh - component-patch</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Compiled</span>
            </div>
            
            <div className="space-y-1.5 text-[11px] pt-1">
              <p className="text-foreground/30">// Refactored Next.js Navigation Loop</p>
              <p className="text-primary"><span className="text-foreground/40">export default function</span> Navbar() <span className="text-foreground/40">{'{'}</span></p>
              <div className="pl-4 space-y-1">
                <p className="text-foreground/70">return (</p>
                <p className="text-emerald-400 pl-4 bg-emerald-500/5 border-l border-emerald-500/40">{"<nav className='sticky top-0 bg-background/60 backdrop-blur-md'>"} </p>
                <p className="text-foreground/50 pl-8">{"{links.map((link) => <NavLink key={link.id} {...link} />)}"}</p>
                <p className="text-foreground/70 pl-4">)</p>
              </div>
              <p className="text-foreground/40">{"}"}</p>
            </div>
          </div>

          {/* Box 2: The Continuous Chat Playground Tracker */}
          <div className="border border-border bg-background/90 p-4 rounded-xl shadow-lg flex flex-col gap-3 max-w-sm ml-auto border-l-2 border-l-primary">
            <div className="flex items-center justify-between text-foreground/40 text-[10px]">
              <span>💬 active-session: uuid-a8f2</span>
              <span>2 mins ago</span>
            </div>
            <div className="flex gap-2 items-start bg-foreground/5 p-2 rounded-lg border border-border/40">
              <span className="text-primary text-xs shrink-0">👤</span>
              <p className="text-[11px] font-sans text-foreground/70 leading-normal">
                "Now take that navbar component and build an active mobile slide drawer using the Shadcn Sheet component blocks."
              </p>
            </div>
            <div className="flex justify-end pt-1">
              <div className="h-6 px-3 bg-primary text-primary-foreground text-[10px] font-sans font-semibold rounded-md flex items-center shadow-xs">
                Regenerating Component Layer...
              </div>
            </div>
          </div>

        </div>

        {/* 🔒 LOWER META DESCRIPTION */}
        <div className="text-xs text-foreground/70 font-light z-10 leading-relaxed max-w-xs">
          Continuous code tracking center. Authenticated session active on secure host loop.
        </div>
      </div>
    </div>
  )
}
