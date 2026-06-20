import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import prisma from "@lib/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login", },
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

      async authorize(credentials) {
        if (!credentials?.useroremail || !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.useroremail as string },
              { name: credentials.useroremail as string },
            ],
          },
        })

        if (!user || !user.password) return null

        const ok = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!ok) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        })

        if (dbUser) {
          token.id = dbUser.id
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})