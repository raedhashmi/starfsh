'use client'

import React, { useState } from 'react'
import { RiAddLine, RiSubtractLine } from '@remixicon/react'

const faqs = [
  {
    q: 'What does starfsh actually scan?',
    a: 'Everything that defines your project — folders, files, READMEs, detected frameworks, and even your github.io pages. The deeper the index, the better the results when you prompt an action.',
  },
  {
    q: 'Which actions are "native" versus "beyond native"?',
    a: 'Native actions are what starfsh is most deeply built for: writing documentation, generating READMEs, fixing code, and refactoring. Beyond-native actions — like performance optimization or anything you type in — are fully supported but more open-ended.',
  },
  {
    q: 'Does it work with private repositories?',
    a: 'The flow is designed around public GitHub links today. Private repository support is on the roadmap and will respect the same scanning and prompting experience.',
  },
  {
    q: 'Will starfsh change my code without asking?',
    a: 'No. starfsh scans first, then prompts you for what you want to do. You stay in control of every regeneration before anything is applied.',
  },
  {
    q: 'Why the name starfsh?',
    a: 'A starfish can regrow a lost limb. starfsh does the same for your codebase — restoring missing docs, broken logic, and rough edges from a single repository link.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mt-32">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</span>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold md:text-5xl">
          Questions, answered
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-foreground/5 transition-colors"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium md:text-base">{item.q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {isOpen ? <RiSubtractLine size={16} /> : <RiAddLine size={16} />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/70">{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
