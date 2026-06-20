import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RiGithubLine, RiTwitterXLine, RiDiscordLine } from '@remixicon/react'

const sections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'How it works', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Guides', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
]

const socials = [
  { icon: RiGithubLine, href: '#', label: 'GitHub' },
  { icon: RiTwitterXLine, href: '#', label: 'X' },
  { icon: RiDiscordLine, href: '#', label: 'Discord' },
]

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-8 py-16 md:grid-cols-6 md:px-12">
        {/* Brand */}
        <div className="col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="starfsh logo" width={36} height={36} />
            <div className="flex items-center space-x-px text-lg">
              <span className="font-light text-foreground/80">star</span>
              <span className="bg-linear-to-r from-primary to-primary-foreground bg-clip-text font-extrabold text-transparent">
                fsh
              </span>
            </div>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-foreground/60">
            Regenerative AI for your codebase. Drop a repo link and restore what&apos;s missing.
          </p>
          <div className="mt-2 flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-6 text-sm text-foreground/50 md:flex-row md:px-12">
          <p>© {new Date().getFullYear()} starfsh. All rights reserved.</p>
          <p>Built for developers who hate broken limbs.</p>
        </div>
      </div>
    </footer>
  )
}
