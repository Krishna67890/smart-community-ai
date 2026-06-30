import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CivicMind AI | AI-Powered Decision Intelligence",
  description: "AI-Powered Decision Intelligence for Smarter Communities. Transform community data into intelligent decisions using Google Gemini and Vertex AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        <AuthGuard>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </AuthGuard>
      </body>
    </html>
  );
}
