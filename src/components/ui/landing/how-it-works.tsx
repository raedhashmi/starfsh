import React from 'react'
import { RiGithubLine, RiRadarLine, RiChat3Line, RiArrowRightLine } from '@remixicon/react'

const steps = [
  {
    icon: RiGithubLine,
    step: '01',
    title: 'Drop your repo link',
    description:
      'Paste any public GitHub repository link. No setup, no config files, no installs — just the URL is enough to begin.',
  },
  {
    icon: RiRadarLine,
    step: '02',
    title: 'starfsh scans everything',
    description:
      'Folders, files, READMEs, frameworks, and even your github.io pages are deeply indexed so the tool truly understands your codebase.',
  },
  {
    icon: RiChat3Line,
    step: '03',
    title: 'Prompt what you need',
    description:
      'Ask for docs, a polished README, a refactor, a bug fix, an optimization pass — or anything else. starfsh regenerates the broken limb.',
  },
]

export default function HowItWorks() {
  return (
    <div id="how-it-works" className='mt-32'>
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">How it works</span>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold md:text-5xl">
          From a single link to a healthier codebase
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-foreground/70 leading-relaxed">
          Like a starfish regrowing a lost limb, starfsh restores what your repository is missing — in three simple steps.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={s.step} className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_rgba(230,200,24,0.12)]" >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon size={22} />
                </div>
                <span className="font-mono text-3xl font-bold text-foreground/10">{s.step}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.description}</p>

              {i < steps.length - 1 && (  
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-foreground/40">
                    <RiArrowRightLine size={14} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
