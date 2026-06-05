// src/app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import PageTransition from "@/components/PageTransition"; //  Temporarily comment this out

import ParticleBackground from "@/components/ParticleBackground";
import AnimatedBackground from "@/components/AnimatedBackground";

import "./globals.css";
import "./styles/animations.css";

export const metadata: Metadata = {
  title: "Arya Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-black text-white antialiased overflow-x-hidden min-h-screen flex flex-col justify-between">

        {/* ===== MASTER GLOBAL ANIMATED CANVAS BACKDROP ===== */}
        <div className="fixed inset-0 -z-50 bg-black pointer-events-none" />
        <div className="fixed inset-0 -z-40 pointer-events-none"><AnimatedBackground /></div>
        <div className="fixed inset-0 -z-30 pointer-events-none opacity-70"><ParticleBackground /></div>

        {/* ===== FIXED UI INTERFACES ===== */}
        <Navbar />

        {/* ===== ANIMATED ROUTING WRAPPER ===== */}
        {/* Changed z-index depth upward to completely dominate rendering fields */}
        <div className="relative z-20 grow w-full bg-transparent">
          {/*  BYPASS WRAPPER: Output children raw to check DOM cleanliness */}
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}