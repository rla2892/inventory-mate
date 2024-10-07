import InventoryStatus from "@/components/InventoryStatus"

export default function Home() {
    return (
        <>
            <div>
                <h1>Inventory Mate</h1>
                <section>
                    <InventoryStatus />
                </section>
                <section>
                    <h2>주문 현황</h2>
                    {/* 주문 현황을 표시하는 컴포넌트 추가 */}
                </section>
                <button>
                    주문 생성
                </button>
            </div>
        </>
    )
}
