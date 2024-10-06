import { PrismaClient } from "@prisma/client"
import { getUserById, getUserByEmail } from "../src/utils/db"

const prisma = new PrismaClient()

describe("Database Utility Functions", () => {
    beforeAll(async () => {
        // 테스트용 사용자 생성
        await prisma.user.create({
            data: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D6",
                email: "test@example.com",
                password: "password123",
                name: "Test User",
            },
        })
    })

    afterAll(async () => {
        // 테스트용 사용자 삭제
        await prisma.user.delete({
            where: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D6",
            },
        })
        await prisma.$disconnect()
    })

    it("should return a user for a valid ID", async () => {
        const user = await getUserById("01J9HWB3NG9TCMVXARPN7CP4D6")
        expect(user).not.toBeNull()
        expect(user?.email).toBe("test@example.com")
    })

    it("should return null for an invalid ID", async () => {
        const user = await getUserById("invalid-id")
        expect(user).toBeNull()
    })

    it("should return a user for a valid email", async () => {
        const user = await getUserByEmail("test@example.com")
        expect(user).not.toBeNull()
        expect(user?.id).toBe("01J9HWB3NG9TCMVXARPN7CP4D6")
    })

    it("should return null for an invalid email", async () => {
        const user = await getUserByEmail("invalid@example.com")
        expect(user).toBeNull()
    })
})
