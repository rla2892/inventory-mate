import { getInventoryStatus } from "../utils/db"

export default async function InventoryStatus() {
    const inventory = await getInventoryStatus()

    return (
        <div>
            <h2>재고 현황</h2>
            <ul>
                {inventory.map(item => (
                    <li key={item.id}>
                        {item.name}: {item.currentStock} 개
                    </li>
                ))}
            </ul>
        </div>
    )
}
