import { PrismaClient } from "@prisma/client"
import { getUserById, getUserByEmail, getInventoryStatus, getOrderStatus } from "../src/utils/db"

const prisma = new PrismaClient()

const testUserId1 = "01JANMEQN646YBNXRZD9EW7RJ0"
const testUserId2 = "01JANMEQN646YBNXRZD9EW7RJ1"
const testProductId = "01JANMEQN646YBNXRZD9EW7RJ2"
const testSalesOrderId = "01JANMEQN646YBNXRZD9EW7RJ3"
const testSalesOrderItemId = "01JANMEQN646YBNXRZD9EW7RJ4"

describe("Database Utility Functions", () => {
    beforeAll(async () => {
        // 테스트용 사용자 생성
        await prisma.user.create({
            data: {
                id: testUserId1,
                email: "test@example.com",
                password: "password123",
                name: "Test User",
            },
        })
        // 테스트용 사용자 생성 2
        await prisma.user.create({
            data: {
                id: testUserId2,
                email: "test2@example.com",
                password: "password123",
                name: "Test User 2",
            },
        })
        // 테스트용 상품 생성
        await prisma.product.create({
            data: {
                id: testProductId,
                name: "Test Product",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })
        // 테스트용 판매 주문 생성
        await prisma.salesOrder.create({
            data: {
                id: testSalesOrderId,
                userId: testUserId1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })
        // 테스트용 판매 주문 항목 생성
        await prisma.salesOrderItem.create({
            data: {
                id: testSalesOrderItemId,
                salesOrderId: testSalesOrderId,
                productId: testProductId,
                quantity: 5,
            },
        })
    })

    afterAll(async () => {
        // 테스트용 판매 주문 항목 삭제
        await prisma.salesOrderItem.delete({
            where: {
                id: testSalesOrderItemId,
            },
        })
        // 테스트용 판매 주문 삭제
        await prisma.salesOrder.delete({
            where: {
                id: testSalesOrderId,
            },
        })
        // 테스트용 사용자 삭제
        await prisma.user.delete({
            where: {
                id: testUserId1,
            },
        })
        // 테스트용 사용자 삭제 2
        await prisma.user.delete({
            where: {
                id: testUserId2,
            },
        })
        // 테스트용 상품 삭제
        await prisma.product.delete({
            where: {
                id: testProductId,
            },
        })
    })

    it("should return a user for a valid ID", async () => {
        const user = await getUserById(testUserId1)
        expect(user).not.toBeNull()
        expect(user?.email).toBe("test@example.com")
        const user2 = await getUserById(testUserId2)
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
        expect(user?.id).toBe(testUserId1)
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

    it("should return order status for valid sales orders", async () => {
        const orderStatus = await getOrderStatus()
        expect(orderStatus).not.toBeNull()
        expect(orderStatus.length).toBeGreaterThan(0)
        orderStatus.forEach(order => {
            expect(order.id).toBeDefined()
            expect(order.userId).toBeDefined()
            expect(order.items.length).toBeGreaterThan(0)
            order.items.forEach(item => {
                expect(item.productId).toBeDefined()
                expect(item.productName).toBeDefined()
                expect(item.quantity).toBeGreaterThan(0)
            })
        })
    })
})
