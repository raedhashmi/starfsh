import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import prisma from "@lib/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }), 
    Credentials({
      credentials: {
        useroremail: { type: "text" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.useroremail || !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.useroremail as string },
              { email: credentials.useroremail as string },
            ],
          },
        })

        if (!user || !user.password) return null
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) return null

        return {
          id: String(user.id), 
          name: user.username,
          email: user.email,
        }
      },
    }),
  ],
})
