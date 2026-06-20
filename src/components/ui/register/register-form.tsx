"use client"

import Link from 'next/link'
import { Input } from '../input'
import { Label } from '../label'
import { Button } from '../button'
import { Switch } from '../switch'
import { Spinner } from "../spinner"
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { registerUser } from "@/app/api/auth/actions"
import { RiErrorWarningFill, RiGithubFill, RiGoogleFill, RiStarFill } from '@remixicon/react'

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [agreedTC, setAgreedTC] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    acceptsMarketing: false,
  })
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    if (!agreedTC) {
      setError("You must agree to the Terms and Conditions!")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setLoading(false)
      return
    } else if (!/\d/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password)) {
      setError("Password must include at least one number and one special character.")
      setLoading(false)
      return
    }

    try {
      const result = await registerUser(formData)

      if (result?.error) {
        setError(result.error)
        return
      }

      router.push("/login")
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-row overflow-x-hidden h-full w-full md:w-screen md:h-screen'>
      <div className='hidden md:flex md:flex-col justify-betwen p-16 w-4/3 h-full bg-linear-to-br from-border to-primary-foreground'>

        <div className="absolute top-10 left-10 w-75 h-75 bg-primary/35 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-50 h-50 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="my-auto max-w-md w-full mx-auto flex flex-col gap-4 z-10 font-mono text-xs">

          <div className="border border-border bg-card/40 backdrop-blur-md p-4 rounded-xl shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between text-foreground/40 border-b border-border/40 pb-2">
              <span>repository-index-stream</span>
              <span className="text-primary-foreground/70 font-bold">86% Done</span>
            </div>
          
            <div className="space-y-1 text-foreground/70 text-[11px]">
              <p className="text-primary-foreground/70">● repositoryName: "starfsh-engine"</p>
              <p>✔ repositoryLink: "://github.com"</p>
              <p>✔ pagesIoLink: "raedh.github.io/starfsh" [Mapped]</p>
              <p className="text-foreground/30">● dateIndexed: Updating local schema matrix...</p>
            </div>
          </div>

          <div className="border border-border bg-background/80 p-4 rounded-xl shadow-lg flex flex-col gap-3 max-w-lg ml-auto border-l-2 border-l-primary">
            <div className="flex items-center gap-1.5 text-foreground/40 text-[10px]">
              <span>💬 chat-session-uuid: e2b4f9...</span>
            </div>
            <p className="text-sm font-sans font-semibold text-foreground leading-normal">
              "Codebase scan complete. What do you want to edit or generate in your repository?"
            </p>
            <div className="h-7 bg-foreground/5 border border-border text-foreground/40 text-[11px] px-3 rounded-lg flex items-center select-none cursor-not-allowed">
              Generate a readme...
            </div>
          </div>
        </div>

        <div className="text-xs text-foreground/70 font-light z-10 leading-relaxed max-w-xs">
          Secure workspace integration console. Authenticating via Prisma client instance protocols.
        </div>
      </div>

      <div className='flex flex-col w-full p-8 text-foreground items-center justify-center'>
        <div className='text-xl mt-8'>
          <span className='font-light text-foreground/80'>star</span>
          <span className="font-extrabold bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-transparent">fsh</span>
          <h1 className='text-3xl font-semibold text-foreground/80'>Create your account</h1>
          <p className='text-sm text-foreground/70'>Regenerate your codebase within seconds</p>
        </div>
        <div className='text-center mt-3'>
            <span className='text-xs tracking-wide uppercase text-foreground/30'>Continue with</span>
        </div>
        <div className='flex flex-row w-full mt-1 gap-2'>
          <div onClick={() => { signIn("github", { callbackUrl: "/dashboard" }); setLoading(true) }} className='flex h-min w-1/2 p-2 rounded-xl bg-card/30 hover:bg-card/60 border border-border items-center justify-center gap-2 duration-300 transition-all'>
            <RiGithubFill />
            <span className='text-foreground/70 text-sm'>Github</span>
          </div>
          <div onClick={() => { signIn("google", { callbackUrl: "/dashboard" }); setLoading(true) }} className='flex h-min w-1/2 p-2 rounded-xl bg-card/30 hover:bg-card/60 border border-border items-center justify-center gap-2 duration-300 transition-all'>
            <RiGoogleFill />
            <span className='text-foreground/70 text-sm'>Google</span>
          </div>
        </div>
        <div className="mt-5 w-full">
          <div className="flex items-center w-full">
            <div className="grow border-t border-border" />
            <span className="px-3 text-xs uppercase text-foreground/30 bg-background">Or continue with</span>
            <div className="grow border-t border-border" />
          </div>
        </div>
        <form className='flex flex-col w-full py-4 space-y-3' onSubmit={handleSubmit}>  
          <div> {/* Username */}
            <p className='text-sm text-foreground/70'>Username: </p>
            <Input className='rounded-lg' type='text' placeholder='John Doe' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div> {/* Email */}
            <p className='text-sm text-foreground/70'>Email: </p>
            <Input className='rounded-lg' type='email' placeholder='example@domain.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div> {/* Password */}
            <p className='text-sm text-foreground/70'>Password: </p>
            <Input className='rounded-lg' type='password' placeholder='••••••••' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <div className='flex flex-col gap-2 mt-1'>
            <div className='flex flex-row text-foreground/70 items-center gap-2'> {/* Promotions & Mail*/}
              <Switch id='promotions-and-mail' checked={formData.acceptsMarketing} onCheckedChange={(checked) => setFormData({ ...formData, acceptsMarketing: checked })} />
              <Label className='text-xs' htmlFor='promotions-and-mail' >I agree to receive promotions and updates about starfsh.</Label>
            </div>
            <div className='flex flex-row text-foreground/70 items-center gap-2'> {/* T&C */}
              <Switch id='terms-and-conditions' checked={agreedTC} onCheckedChange={(c) => setAgreedTC(c)} />
              <Label className='text-xs' htmlFor='terms-and-conditions'>I agree to the <Button variant={"link"} onClick={() => router.push('/terms-and-conditions')} className='p-0 -m-1 text-xs'>Terms & Conditions</Button></Label>
            </div>
          </div>
          {error && (
            <div className='flex bg-red-500/10 border-red-700/60 p-1 text-xs text-center items-center justify-center rounded-xl gap-2'>
              <RiErrorWarningFill className="text-red-400/40" />
              <span>{error}</span>
            </div>
          )}
     
          <div className='flex flex-col'>
            <Button className='mt-1'>{isLoading ? <> <Spinner /> Creating account... </> : "Get Started"}</Button>
            <span className='self-center text-xs mt-2'>Already have an account? <Link href={'/login'} className='text-blue-400 hover:underline'>Log in here!</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}
