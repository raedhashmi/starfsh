"use server"

import bcrypt from "bcryptjs"
import { signIn } from "@/auth"
import prisma from "@lib/prisma"

export async function registerUser(data: { name: string, email: string, password: string, acceptsMarketing: boolean }) {
  const { email, name, password, acceptsMarketing } = data
  
  if (!email || !name || !password)  return { error: "Missing fields.", status: 400 }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return { error: "This email is already registered.", status: 409 }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        acceptsMarketing: acceptsMarketing,
      },
    })

    await signIn("credentials", {
      useroremail: email,
      password: password,
      redirectTo: `/dashboard`,
    })

    return { message: "Account successfully registered.", status: 200 }
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }

    console.error("Registration error:", error)
    return { error: "Internal server fatality.", status: 500 }
  }
}

export async function loginUser(data: { useroremail: string; password: string }) {
  const { useroremail, password } = data

  if (!useroremail || !password) return { error: "Missing fields.", status: 400 }

  try {
    await signIn("credentials", {
      useroremail,
      password,
      redirect: false
    })
    
    return { message: "Successfully logged in.", status: 200 }
  } catch (error: any) {
    if (error?.type === "CredentialsSignin") {
      const authError = error as { type?: string }

      if (authError.type === "CredentialsSignin") return { error: "Invalid username/email or password.", status: 401 }
      return { error: "Internal server fatality.", status: 500 }
    }

    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) throw error
    console.error(error)

    return { error: "Internal server fatality.", status: 500 }
  }
}
