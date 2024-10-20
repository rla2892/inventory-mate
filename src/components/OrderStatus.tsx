import { getOrderStatus } from "../utils/db"

export default async function OrderStatus() {
    const orders = await getOrderStatus()

    return (
        <div>
            <h2>주문 현황</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        주문 ID: {order.id}, 사용자: {order.userId}
                    </li>
                ))}
            </ul>
        </div>
    )
}

