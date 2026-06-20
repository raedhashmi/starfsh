import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex fixed top-4 inset-x-0 mx-auto p-4 px-8 w-[80%] h-16 z-100 rounded-3xl items-center justify-between border border-[#E69C12]/20 bg-primary/10 backdrop-blur-sm shadow-lg">
      <div className="flex text-lg items-center space-x-4">
        <Link href={'/'}>
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex space-x-px items-center">
          <span className='font-light text-white/80'>star</span>
          <span className="font-extrabold bg-linear-to-r from-[#A36500] to-[#E69C12] bg-clip-text text-transparent">fsh</span>
        </div>
        <div className="flex space-x-6 ml-4 text-white/80 text-sm items-center">
          <Link href="/docs" className="hover:text-[#E69C12] transition-all hover:border-b hover:border-[#E69C12]">Docs</Link>
          <Link href="/about" className="hover:text-[#E69C12] transition-all hover:border-b hover:border-[#E69C12]">About</Link>
          <Link href="/about" className="hover:text-[#E69C12] transition-all hover:border-b hover:border-[#E69C12]">Contact</Link>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" className="text-white/80 hover:text-[#E69C12] hover:border-[#E69C12]">Login</Button>
        <Button className="bg-[#E69C12] text-white hover:bg-[#A36500]">Register</Button>
      </div>
    </nav>
  )
}
