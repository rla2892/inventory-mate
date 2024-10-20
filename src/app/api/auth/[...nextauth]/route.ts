import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { getUserByEmail } from "@/utils/db"

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const user = await getUserByEmail(credentials?.email || "")

                    if (user && user.password === credentials?.password) {
                        return user
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error("Error authorizing user:", error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session && session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    }
})

export { handler as GET, handler as POST }
