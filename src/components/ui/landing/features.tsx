import React from 'react'
import {
  RiFileTextLine,
  RiBookOpenLine,
  RiCodeBoxLine,
  RiBug2Line,
  RiSpeedUpLine,
  RiSparkling2Line,
  RiCheckLine,
  RemixiconComponentType,
} from '@remixicon/react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "./badge"

function FeatureIcon({ icon: Icon }: { icon: RemixiconComponentType }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
      <Icon size={20} />
    </div>
  )
}

function NormalIcon({ icon: Icon }: { icon: RemixiconComponentType }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/5 text-foreground/70 ring-1 ring-foreground/10">
      <Icon size={20} />
    </div>
  )
}

export default function Features() {

  const features = [
    {
      id: 'docs',
      icon: RiFileTextLine,
      title: 'Documentation that writes itself',
      badge: { text: 'Native', variant: 'default' as const },
      desc: 'starfsh reads every module, function, and framework convention, then generates accurate, structured docs your team can actually trust.',
      col: 'md:col-span-4',
      row: 'md:row-span-2',
      isLarge: true,
      preview: (
        <div className="mt-6 rounded-xl border border-border/60 bg-foreground/5 p-4 font-mono text-xs text-foreground/60 shadow-inner">
          <div className="flex items-center gap-2 text-foreground/40">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>docs/overview.md</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-1/3 rounded bg-primary/40 animate-pulse" />
            <div className="h-2 w-5/6 rounded bg-foreground/15" />
            <div className="h-2 w-2/3 rounded bg-foreground/15" />
            <div className="h-2 w-1/4 rounded bg-primary/40" />
            <div className="h-2 w-3/4 rounded bg-foreground/15" />
          </div>
        </div>
      )
    },
    {
      id: 'readme',
      icon: RiBookOpenLine,
      title: 'Polished READMEs',
      badge: { text: 'Native', variant: 'default' as const },
      desc: 'Badges, setup steps, usage, and structure — a README that earns stars.',
      col: 'md:col-span-2',
    },
    {
      id: 'refactor',
      icon: RiCodeBoxLine,
      title: 'Refactor with context',
      badge: { text: 'Native', variant: 'default' as const },
      desc: 'Restructure code while respecting your patterns, not generic boilerplate.',
      col: 'md:col-span-2',
    },
    {
      id: 'perf',
      icon: RiSpeedUpLine,
      title: 'Optimize performance',
      badge: { text: 'Beyond native', variant: 'outline' as const },
      desc: 'Trim bottlenecks, reduce bundle weight, and tune hot paths when you ask for it.',
      col: 'md:col-span-4',
      muted: true,
    },
    {
      id: 'fix',
      icon: RiBug2Line,
      title: 'Fix broken code',
      badge: { text: 'Native', variant: 'default' as const },
      desc: 'Pinpoint and repair bugs across files, the way a starfish regrows a limb.',
      col: 'md:col-span-2',
      row: 'md:row-span-2',
      isLarge: true,
      preview: (
        <div className="mt-6 rounded-xl border border-border/60 bg-foreground/5 p-4 font-mono text-xs flex flex-col gap-3 shadow-inner">
          <div className="flex items-center justify-between text-foreground/40 border-b border-border/40 pb-2">
            <span className="text-[10px]">analyzer-stream</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded">Resolved</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-1">
            {/* Left Box: Unoptimized Source Code Mockup */}
            <div className="flex flex-col gap-2 border border-border bg-background/40 p-2 rounded-lg">
              <span className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider">Source Tree</span>
              <div className="h-1.5 w-full rounded bg-red-500/20" />
              <div className="h-1.5 w-4/5 rounded bg-foreground/10" />
              <div className="h-1.5 w-2/3 rounded bg-red-500/20" />
            </div>

            {/* Right Box: Target Output Code Mockup */}
            <div className="flex flex-col gap-2 border border-primary/20 bg-primary/5 p-2 rounded-lg">
              <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Refactored</span>
              <div className="h-1.5 w-full rounded bg-primary/30" />
              <div className="h-1.5 w-5/6 rounded bg-primary/30" />
              <div className="h-1.5 w-full rounded bg-foreground/10" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'anything',
      icon: RiSparkling2Line,
      title: 'Anything you prompt',
      badge: { text: 'Beyond native', variant: 'outline' as const },
      descItems: ['Add tests', 'Migrate frameworks', 'Explain modules', 'Translate comments'],
      col: 'md:col-span-4',
      muted: true,
    },
  ]

  return (
    <section className="mt-32">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">Capabilities</span>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold md:text-5xl">
          One tool, every kind of repair
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-foreground/70 leading-relaxed">
          The deeper, native actions are what starfsh does best — but you are never boxed in. Prompt it for anything.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-auto gap-5 md:grid-cols-6 grid-cols-1">
        {features.map((f) => {
          const base = `bg-card ${f.muted ? 'bg-card/60' : ''} p-6 px-4 rounded-2xl ${f.col || ''} ${f.row || ''} border ${f.muted ? 'border-dashed border-border' : 'border-border'} ring-1 ring-foreground/5 transition-all duration-200 hover:border-primary/40 flex flex-col justify-between`
          return (
            <Card key={f.id} className={base}>
              <CardHeader className={f.isLarge ? 'flex flex-col items-start gap-4 p-0' : 'flex flex-col gap-3 p-0'}>
                <div>{f.muted ? <NormalIcon icon={f.icon} /> : <FeatureIcon icon={f.icon} />}</div>
                <div className="flex-1 w-full">
                  <CardTitle className={`flex items-center gap-3 justify-between ${f.isLarge ? 'text-xl font-semibold' : 'text-base font-semibold'}`}>
                    <span>{f.title}</span>
                    {f.badge && (
                      <CardAction className="shrink-0">
                        <Badge variant={f.badge.variant}>{f.badge.text}</Badge>
                      </CardAction>
                    )} 
                  </CardTitle>
                  {f.desc && (
                    <CardDescription className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {f.desc}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              {(f.descItems || f.preview) && (
                <CardContent className="p-0 mt-4 w-full">
                  {f.descItems && (
                    <div className="flex flex-wrap gap-2 text-sm leading-relaxed text-foreground/70">
                      {f.descItems.map((t: string) => (
                        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-1 text-xs text-foreground/60">
                          <RiCheckLine size={12} className="text-primary" />
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {f.preview}
                </CardContent>
              )}
              <CardFooter className="p-0" />
            </Card>
          )
        })}
      </div>
    </section>
  )
}
