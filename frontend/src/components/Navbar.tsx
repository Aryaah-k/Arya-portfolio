"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Certificates", href: "/certificates" },

    // Option A: Pointing directly to your Django backend superuser admin panel
{
  name: "Admin",
  href: `${process.env.NEXT_PUBLIC_API_URL}/admin/`,
},
    // Option B: If you have a local Next.js page instead, uncomment the line below and remove the one above:
    // { name: "Admin", href: "/admin" }, 
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5 pointer-events-auto transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ================= BRAND LOGO ================= */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-90 transition-opacity"
            >
              Arya.K
            </Link>
          </div>

          {/* ================= DESKTOP NAV ARCHITECTURE ================= */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${isActive
                      ? "text-indigo-400 font-bold"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ================= MOBILE HAMBURGER TOGGLE ================= */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle navigation display panel</span>
              {isOpen ? (
                // Close Menu Icon (X)
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Open Menu Icon (Hamburger lines)
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ================= MOBILE VIEW RESPLENDENT TRAY ================= */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-black/95 border-b border-white/5 backdrop-blur-2xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Resets the mobile drawer state when clicked
                  className={`px-4 py-3 text-xs font-mono tracking-widest uppercase rounded-xl transition-all ${isActive
                      ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 pl-3"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}