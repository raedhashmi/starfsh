import React from 'react'

export default function Stats() {
  return (
    <div className='flex flex-row mt-26 w-full  space-x-2'>
        <div className='flex flex-col w-full p-3 h-24 text-center border border-border rounded-2xl items-center justify-center'>
            <span className='text-foreground/70 text-[12px] -mt-2 mb-2 md:-mt-3 md:mb-3 font-light uppercase'>Customers Satified</span>
            <span className='font-extrabold text-2xl md:text-4xl'>87%</span>
        </div>
        <div className='flex flex-col w-full p-3 h-24 text-center border border-border rounded-2xl items-center justify-center'>
            <span className='text-foreground/70 text-[12px] -mt-2 mb-2 md:-mt-3 md:mb-3 font-light uppercase'>Projects Fixed</span>
            <span className='font-extrabold text-2xl md:text-4xl'>3,000+</span>
        </div>
        <div className='flex flex-col w-full p-3 h-24 text-center border border-border rounded-2xl items-center justify-center'>
            <span className='text-foreground/70 text-[12px] -mt-2 mb-2 md:-mt-3 md:mb-3 font-light uppercase'>Results</span>
            <span className='font-extrabold text-2xl md:text-4xl'>99%</span>
        </div>
      </div>
  )
}
