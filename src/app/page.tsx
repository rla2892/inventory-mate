import InventoryStatus from "@/components/InventoryStatus"
import OrderStatus from "@/components/OrderStatus"

export default function Home() {
    return (
        <>
            <div>
                <h1>Inventory Mate</h1>
                <section>
                    <InventoryStatus />
                </section>
                <section>
                    <OrderStatus />
                </section>
                <button>
                    주문 생성
                </button>
            </div>
        </>
    )
}
