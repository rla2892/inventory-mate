import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * 주어진 ID로 사용자를 가져오는 함수
 * @param userId - 사용자의 ID
 * @returns 사용자 객체 또는 null
 */
export async function getUserById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        return user
    } catch (error) {
        console.error("Error fetching user:", error)
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return user
    } catch (error) {
        console.error("Error fetching user:", error)
        return null
    } finally {
        await prisma.$disconnect()
    }
}

