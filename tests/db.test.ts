import { PrismaClient } from "@prisma/client"
import { getUserById, getUserByEmail, getInventoryStatus } from "../src/utils/db"

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
        // 테스트용 사용자 생성 2
        await prisma.user.create({
            data: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D7",
                email: "test2@example.com",
                password: "password123",
                name: "Test User 2",
            },
        })
        // 테스트용 상품 생성
        await prisma.product.create({
            data: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D8",
                name: "Test Product",
                createdAt: new Date(),
                updatedAt: new Date(),
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
        // 테스트용 사용자 삭제 2
        await prisma.user.delete({
            where: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D7",
            },
        })
        // 테스트용 상품 삭제
        await prisma.product.delete({
            where: {
                id: "01J9HWB3NG9TCMVXARPN7CP4D8",
            },
        })
    })

    it("should return a user for a valid ID", async () => {
        const user = await getUserById("01J9HWB3NG9TCMVXARPN7CP4D6")
        expect(user).not.toBeNull()
        expect(user?.email).toBe("test@example.com")
        const user2 = await getUserById("01J9HWB3NG9TCMVXARPN7CP4D7")
        expect(user2).not.toBeNull()
        expect(user2?.email).toBe("test2@example.com")
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

    it("should return inventory status for valid products", async () => {
        const inventoryStatus = await getInventoryStatus()
        expect(inventoryStatus).not.toBeNull()
        // 길이가 0 이상이어야 함
        expect(inventoryStatus.length).toBeGreaterThan(0)
        // 각 상품의 재고 상태가 존재해야 함
        inventoryStatus.forEach(status => {
            expect(status.id).toBeDefined()
            expect(status.currentStock).toBeDefined()
        })
    })
})
