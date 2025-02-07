"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo lub nazwa strony */}
                <Link href="/">
                    <span className="text-xl font-bold text-blue-600 cursor-pointer">
                        Fotograf
                    </span>
                </Link>

                {/* Linki nawigacyjne */}
                <div className="space-x-4">
                    <Link href="/">
                        <span
                            className={`hover:text-blue-600 transition cursor-pointer ${
                                pathname === "/" ? "font-semibold" : ""
                            }`}
                        >
                            Home
                        </span>
                    </Link>
                    <Link href="/admin">
                        <span
                            className={`hover:text-blue-600 transition cursor-pointer ${
                                pathname === "/admin" ? "font-semibold" : ""
                            }`}
                        >
                            Panel Administracyjny
                        </span>
                    </Link>
                    <Link href="/client">Strefa Klienta</Link>
                </div>
            </div>
        </nav>
    );
}
