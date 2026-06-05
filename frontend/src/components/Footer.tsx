"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // FIXED: Changed to transparent black (bg-neutral-950/40) with a premium glass blur effect
    <footer className="w-full border-t border-white/5 bg-neutral-950/40 backdrop-blur-md text-white relative z-20">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-base font-black tracking-tight">
            Arya<span className="text-indigo-400">.K</span>
          </div>
          <p className="text-xs text-zinc-500 text-center md:text-left">
             {new Date().getFullYear()} All rights reserved. Architected with Next.js
          </p>
        </div>

        {/* Center: Internal Application Routing Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium tracking-wide">
          <Link href="/" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-200">
            Home
          </Link>
          <Link href="/projects" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-200">
            Projects
          </Link>
          <Link href="/contact" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-200">
            Contact
          </Link>
        </div>

        {/* Right Side: Social Vectors & Utility Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.423-10-10-10z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#0077b5] transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-4 bg-zinc-800 hidden sm:block" />

          {/* Smooth Back to Top Action */}
          <button
            onClick={scrollToTop}
            className="group p-2 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 shadow-sm"
            aria-label="Scroll to top"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}