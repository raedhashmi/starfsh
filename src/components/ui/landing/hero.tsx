import React from 'react'
import { Button } from './button'
import MockWin from './mock-window'

export default function Hero() {
  return (
    <div className="md:flex items-center justify-between space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-transparent">One Tool,</h1>
        <h1 className="text-foreground/80 text-5xl md:text-7xl font-light tracking-tight">All you need</h1>

        <div className="flex flex-col mt-6 text-lg text-foreground/80 md:max-w-sm ">
          <p className='font-medium md:text-left text-center'>
            Let starfsh scan your codebase, then watch as the possibilities unfold. With one command, you can generate documentation, and even refactor your code. It's like having a coding assistant that understands your mind.
          </p>

          <Button className='mt-4 transition-all duration-200 hover:scale-101 hover:shadow-[0_0_8px_rgba(230,200,24,0.6)]'>Get Started</Button>
        </div>
      </div>

      <MockWin />
    </div>
  )
}
