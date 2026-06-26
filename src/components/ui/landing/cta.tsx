'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../dashboard/input-group'
import { RiGithubLine, RiArrowRightLine } from '@remixicon/react'

export default function CTA() {
  const [link, setLink] = useState('')

  return (
    <section className="mt-32">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-14 text-center md:px-16 md:py-20">
        {/* soft glow accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="text-balance text-3xl font-bold md:text-5xl">
            Give your repository a second chance
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-foreground/70 leading-relaxed">
            Paste a GitHub link and let starfsh regenerate the missing pieces — docs, fixes, refactors, and more.
          </p>

          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <InputGroup>
              <InputGroupInput onChange={(e) => setLink(e.target.value)} placeholder="https://github.com/your-name/project" />
              <InputGroupAddon>
                <RiGithubLine />
              </InputGroupAddon>
            </InputGroup>
            <Link href={`/register?add-repo=${link}`}><Button className="shrink-0 px-6 transition-all duration-200 hover:scale-101 hover:shadow-[0_0_8px_rgba(230,200,24,0.6)] sm:w-auto">
              Scan it
              <RiArrowRightLine size={16} />
            </Button></Link>
          </div>

          <p className="mt-4 text-xs text-foreground/50">No credit card required · Works with any public repo</p>
        </div>
      </div>
    </section>
  )
}
