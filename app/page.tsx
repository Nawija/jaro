import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Strona Fotografa</h1>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link href="/admin">
                            <span className="text-blue-600 hover:underline text-xl cursor-pointer">
                                Panel Administracyjny
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client">
                            <span className="text-blue-600 hover:underline text-xl cursor-pointer">
                                Strefa Klienta
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
