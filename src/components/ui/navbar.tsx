'use client'
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./sheet"
import { RiMenuLine } from "@remixicon/react"
import { Button } from "./button"

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="flex fixed top-4 inset-x-0 mx-auto p-4 px-8 w-[80%] h-16 z-20 rounded-3xl items-center justify-between border border-primary/20 bg-primary/10 backdrop-blur-sm shadow-lg">
      <div className="flex text-lg items-center space-x-4">
        <Link href={'/'}>
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex space-x-px items-center">
          <span className='font-light text-foreground/80'>star</span>
          <span className="font-extrabold bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-transparent">fsh</span>
        </div>
        <div className="hidden md:flex space-x-6 ml-4 text-foreground/80 text-sm items-center">
          <Link href="/docs" className="hover:text-primary transition-all hover:border-b hover:border-primary">Docs</Link>
          <Link href="/about" className="hover:text-primary transition-all hover:border-b hover:border-primary">About</Link>
          <Link href="/about" className="hover:text-primary transition-all hover:border-b hover:border-primary">Contact</Link>
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        <Button variant="outline" className="text-foreground/80 hover:text-primary hover:border-primary" onClick={() => router.push('/login')}>Login</Button>
        <Button className="bg-primary text-foreground hover:bg-primary-foreground" onClick={() => router.push('/register')}>Register</Button>
      </div>

      <div className='md:hidden flex items-center'>
        <Sheet>
          <SheetTrigger><RiMenuLine size={20}/></SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-sm border-l border-border z-101">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold mt-8">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 ml-6">
              <Link href="/docs" className="hover:text-primary transition-all hover:border-b hover:border-primary">Docs</Link>
              <Link href="/about" className="hover:text-primary transition-all hover:border-b hover:border-primary">About</Link>
              <Link href="/contact" className="hover:text-primary transition-all hover:border-b hover:border-primary">Contact</Link>
            </div>
            <SheetFooter className="">
              <Button variant="outline" className="w-full mb-2 text-foreground/80 hover:text-primary hover:border-primary" onClick={() => router.push('/login')}>Login</Button>
              <Button className="w-full bg-primary text-foreground hover:bg-primary-foreground" onClick={() => router.push('/register')}>Register</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
