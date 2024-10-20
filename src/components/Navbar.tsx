import React from "react"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/inventory">Inventory</Link>
                </li>
                <li>
                    <Link href="/orders">Orders</Link>
                </li>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
                <li>
                    <Link href="/signin">Sign In</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
