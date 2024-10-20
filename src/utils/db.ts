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

/**
 * 모든 제품의 재고 현황을 가져오는 함수
 * @returns 제품 목록과 각 제품의 재고 수량
 */
export async function getInventoryStatus() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                salesOrderItems: {
                    select: {
                        quantity: true,
                    },
                },
                purchaseOrderItems: {
                    select: {
                        quantity: true,
                    },
                },
            },
        })

        return products.map(product => {
            const soldQuantity = product.salesOrderItems.reduce((acc, item) => acc + item.quantity, 0)
            const purchasedQuantity = product.purchaseOrderItems.reduce((acc, item) => acc + item.quantity, 0)
            const currentStock = purchasedQuantity - soldQuantity

            return {
                id: product.id,
                name: product.name,
                currentStock,
            }
        })
    } catch (error) {
        console.error("Error fetching inventory status:", error)
        return []
    } finally {
        await prisma.$disconnect()
    }
}

export async function getOrderStatus() {
    try {
        const orders = await prisma.salesOrder.findMany({
            include: {
                user: true,
                salesOrderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return orders.map(order => ({
            id: order.id,
            userId: order.userId,
            items: order.salesOrderItems.map(item => ({
                productId: item.productId,
                productName: item.product.name,
                quantity: item.quantity,
            })),
        }))
    } catch (error) {
        console.error("Error fetching order status:", error)
        return []
    } finally {
        await prisma.$disconnect()
    }
}
