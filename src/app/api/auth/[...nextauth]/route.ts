import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/utils/db"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await getUserByEmail(credentials?.email || "")

                if (user && user.password === credentials?.password) {
                    return user
                } else {
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
