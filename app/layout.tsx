import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Strona Fotografa",
    description: "Strona Fotografa",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <body
                className={`${geistSans.variable} antialiased bg-gray-100 text-gray-900`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
