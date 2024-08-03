import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

import Sidebar from '../components/Sidebar'

export const metadata: Metadata = {
  title: "Windmill generator",
  description: "Sites for visualize wind farm station area in temanggung",
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

        <div className="flex-1 bg-gray-100">{children}</div>
      </body>
    </html>
  );
}
