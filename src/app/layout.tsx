import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
    title: "Windmill generator",
    description: "Windmill generator to calculate electric potential energy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`flex ${inter.className}`}>
                <Sidebar />

                <div className="flex-1 h-screen overflow-auto">{children}</div>
            </body>
        </html>
    );
}
