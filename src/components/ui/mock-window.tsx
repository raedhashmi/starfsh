import React from 'react'

export default function MockWin() {
  return (
    <div className="flex flex-col w-full md:w-2/4 h-96 rounded-lg border border-foreground/30 overflow-hidden">
      <div className="flex w-full h-12 gap-2 bg-foreground/5 border-b border-foreground/30 items-center">
        <span className='bg-red-500 rounded-full w-1 h-1 p-1.5 ml-4' />
        <span className='bg-yellow-500 rounded-full w-1 h-1 p-1.5' />
        <span className='bg-green-500 rounded-full w-1 h-1 p-1.5' />
        <p className='ml-4 text-sm text-foreground/70'>starfsh - Generating your code...</p>
      </div>

        {/* Layout split: Left Workspace and Right Sidebar Panel */}
        <div className="flex h-full w-full overflow-hidden">
          
          {/* 📝 LEFT MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col p-6 justify-between">
            <div className="flex flex-col w-full space-y-4">
              <span className='text-foreground/80 text-2xl font-bold'>What's on your mind?</span>

              {/* Disabled Action Input Field Block */}
              <div className="w-full">
                <input 
                  type="text" 
                  disabled 
                  placeholder="What do you want to edit in your codebase?" 
                  className="w-full text-xs bg-foreground/5 border border-border text-foreground/40 placeholder:text-foreground/30 p-3 rounded-xl cursor-not-allowed outline-hidden"
                />
              </div>

              {/* Generating Readme Processing Badge Container */}
              <div className="text-foreground/70 p-3 text-left border border-primary/30 rounded-xl bg-primary/5 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span>Generating readme in progress...</span>
                </div>
              </div>
            </div>
          </div>

          {/* 📊 RIGHT SIDEBAR PANEL */}
          <div className="w-36 md:w-44 shrink-0 border-l border-border/40 bg-foreground/5 p-4 flex flex-col justify-between">
            {/* Top Indexing Status Box */}
            <div className="flex flex-col space-y-2 p-2.5 rounded-xl border border-border/40 bg-background/50">
              <span className="text-[10px] uppercase font-mono text-foreground/40 tracking-wider">System Status</span>
              <div className="flex items-center justify-between font-mono text-xs font-semibold text-foreground/80">
                <span>Indexed</span>
                <span className="text-primary">86%</span>
              </div>
              {/* Micro Tracking Progress Bar Element */}
              <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[86%] rounded-full" />
              </div>
            </div>

            {/* Bottom Actions Directory Tree mockup tracker */}
            <div className="flex flex-col space-y-1 text-[10px] font-mono text-foreground/40">
              <div className="truncate text-primary">● indexing modules...</div>
              <div className="truncate">✓ github.io mapped</div>
              <div className="truncate">✓ src/ parsed</div>
            </div>
          </div>

        </div> 
      </div>
  )
}
