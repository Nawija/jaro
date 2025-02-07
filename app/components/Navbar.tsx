'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold text-blue-600">Fotograf</span>
        </Link>

        {/* Nawigacja */}
        <div className="flex space-x-6">
          <Link href="/" className={`hover:text-blue-600 ${pathname === '/' ? 'text-blue-800' : ''}`}>
            Home
          </Link>
          <Link href="/admin" className={`hover:text-blue-600 ${pathname === '/admin' ? 'text-blue-800' : ''}`}>
            Panel Administracyjny
          </Link>
          <Link href="/client" className={`hover:text-blue-600 ${pathname === '/client' ? 'text-blue-800' : ''}`}>
            Strefa Klienta
          </Link>
        </div>
      </div>
    </nav>
  );
}
