import { auth } from '@/auth'
import prisma from '@lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { sendMessage } from '@/app/api/chat/route'
import { RiAddLargeLine, RiCloseLine, RiSendPlane2Fill } from '@remixicon/react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/dashboard/input-group'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/dashboard/chat/select'

async function createChat(formData: FormData) {
  'use server'
  const session = await auth()
  const prompt = formData.get("prompt") as string
  const repo = formData.get("repo") as string

  if (!prompt?.trim()) return  
  if (!session?.user?.id) redirect('/login')

  const chat = await prisma.chat.create({
    data: {
      userId: session.user.id,
      title: prompt.slice(0, 50),
      repositoryId: repo,
    },
  })
  
  const fd = new FormData()
  fd.append("prompt", prompt)

  await sendMessage(chat.id, fd)

  redirect(`/dashboard/chat/${chat.id}`)
}

export default async function Chat() {
  const session = await auth()
  
  if (!session || !session.user || !session.user.id) return redirect('/login')

  const repos = await prisma.repository.findMany({ where: { userId: session.user.id } })  

  const prompts = [
    "If patching were power, what would I fix first?",
    "What did the world look like before no-code?",
    "Can machines dream in electric sheep?",
    "What if code could write itself from a single thought?",
    "Where does creativity begin when automation leads?",
    "Do you code because you are a coder? Or are you a coder because you code?",
    "Why do we build what we secretly fear?",
    "Is simplicity the highest form of sophistication?",
    "What happens if we stop optimizing for speed?",
    "Can technology really solve people problems?",
    "What will making feel like in ten years?",
    "Imagine a tool that understands intent before instruction.",
    "Is progress only meaningful when it eases life?",
    "Some ideas shine brightest in a single line of code.",
    "The best interfaces fade until users forget they're there.",
    "Could a prompt be the start of a new culture?",
    "Good design is not decoration; it is direction.",
    "What if every problem had a playful answer?",
    "We shape products as much as products shape us.",
    "There is value in asking why before building how.",
    "A quiet dashboard can still tell a powerful story.",
  ]

  const mainstr = prompts[Math.floor(Math.random() * prompts.length)]

  return (
    <div className='top-0 inset-x-0 p-4 h-full w-full rounded-xl bg-radial from-card to-background'>
      <div className='flex flex-col h-full w-full gap-6 items-center justify-center px-4'>
        <h1 className='text-4xl text-center max-w-2xl leading-snug text-foreground/80'>{mainstr}</h1>
        <form action={createChat} className="flex flex-row w-full items-center justify-center">
          <InputGroup className="h-12 max-w-3xl">
            <InputGroupInput name='prompt' placeholder="Give me anything..." />
            <InputGroupAddon>
              <Select defaultValue="none" name="repo">
                <SelectTrigger className="w-min border-0 shadow-none">
                  <SelectValue placeholder="None" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Your Projects</SelectLabel>
                    <SelectItem value='none'>None</SelectItem>
                    {repos.map(repo => (
                      <SelectItem key={repo.id} value={repo.id}>{repo.repositoryName}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <Button type='submit'><RiSendPlane2Fill /></Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  )
}
