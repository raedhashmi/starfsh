import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import prisma from "@lib/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
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
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url, // 🔥 THIS is the key
        }
      },
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
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile)
      if (account?.provider !== "credentials" && user.email) {
        const image = (profile as any)?.picture ?? user.image

        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? "",
            image,
          },
          create: {
            email: user.email,
            name: user.name ?? "",
            image,
          },
        })

        user.id = dbUser.id
        user.image = dbUser.image
      }

      return true
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
      }

      return session
    },
  },
})