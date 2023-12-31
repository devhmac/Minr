import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Minr",
  description: "A Full Stack Prouct Analytics Crawler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#121212]">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto text-secondary ">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
