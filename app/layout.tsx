import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minr",
  description: "A Full Stack Product Analytics Crawler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`dark bg-[#121212]`}>
    <html lang="en" className={`${inter.className} dark bg-[#121212]`}>
      <body>
        <main className="max-w-10xl mx-auto text-secondary ">
          <Nav />

          {children}
        </main>
      </body>
    </html>
  );
}
