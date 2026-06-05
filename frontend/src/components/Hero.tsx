"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  adminImage: string | null | undefined; 
  adminTitle?: string;
  adminSubtitle?: string;
  adminResume?: string;
  isLoading: boolean;
}

export default function Hero({ adminImage, adminTitle, adminSubtitle, adminResume = "/resume.pdf", isLoading }: HeroProps) {
  const [active, setActive] = useState("projects");

  // ================= TYPING ANIMATION ENGINE =================
  const skills = useMemo(
    () => [
      "React.js",
      "Next.js",
      "TypeScript",
      "Python",
      "Django",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
    []
  );

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = skills[currentSkillIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    const holdDelay = 1600;

    const handleTextCycle = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), holdDelay);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
        }
      }
    };

    const timer = setTimeout(handleTextCycle, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentSkillIndex, skills]);

  // ================= STYLING STRINGS =================
  const base =
    "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden";

  const activeStyle =
    "text-white bg-indigo-500 shadow-lg shadow-indigo-500/20 border border-indigo-400/30";

  const inactiveStyle =
    "text-gray-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20";

  const glow =
    "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12";

  // ================= SMART IMAGE PATH RESOLVER =================
  const getImageUrl = (path: string | null | undefined) => {
    // 1. If no image has been uploaded or state is empty, use a placeholder in your Next.js /public folder
    if (!path) return "/fallback-placeholder.png"; 
    
    // 2. If Django sends an absolute URL (e.g., http://127.0.0.1:8000/media/headshots/image.png)
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    
    // 3. If Django sends a relative URL string containing the media segment (e.g., /media/headshots/image.png)
    if (path.startsWith("/media/")) {
      return `http://127.0.0.1:8000${path}`;
    }

    // Explicitly handle the fallback placeholder so it stays on the Next.js side
    if (path === "/fallback-placeholder.png") {
      return path;
    }

    // 4. If Django sends a relative path starting with a slash but missing media (e.g., /headshots/image.png)
    if (path.startsWith("/")) {
      return `http://127.0.0.1:8000/media${path}`;
    }
    
    // 5. If Django only passes back the raw file descriptor name string (e.g., image.png)
    return `http://127.0.0.1:8000/media/${path}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 lg:py-0 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ================= LEFT SIDE (TEXT CONTENT) ================= */}
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-wide fade-in backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for New Opportunities
            </div>

            <p className="text-indigo-400 font-semibold tracking-widest text-sm md:text-base uppercase fade-in [animation-delay:150ms]">
              Hello, I am
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none scale-in [animation-delay:300ms]">
              {adminTitle ? (
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_10px_rgba(168,85,247,0.2)]">
                  {adminTitle}
                </span>
              ) : (
                <>
                  Arya{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_10px_rgba(168,85,247,0.2)]">
                    K
                  </span>
                </>
              )}
            </h1>

            <div className="h-8 text-lg md:text-xl font-mono text-gray-300 slide-up [animation-delay:400ms] flex items-center justify-center md:justify-start gap-2">
              <span className="text-gray-400">Specializing in</span>
              <span className="text-indigo-400 font-bold border-r-2 border-indigo-400 pr-1 animate-[pulse_0.8s_infinite] min-w-0.5">
                {currentText}
              </span>
            </div>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 slide-up [animation-delay:500ms]">
              {adminSubtitle || (
                <>
                  Architecting high-performance digital experiences. Specializing in
                  frontend systems with <span className="text-white font-medium">Next.js</span>, robust backends with <span className="text-white font-medium">Django</span>, and fluid, high-fidelity UI layout engineering.
                </>
              )}
            </p>

            <div className="space-y-2 pt-2 slide-up [animation-delay:650ms]">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block text-center md:text-left">
                Core Stack Technologies
              </span>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:scale-[1.05] shadow-sm hover:shadow-indigo-500/10 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6 slide-up [animation-delay:800ms]">
              <Link
                href="/projects"
                onClick={() => setActive("projects")}
                className={`group ${base} ${active === "projects" ? activeStyle : inactiveStyle}`}
              >
                <span className={glow} />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setActive("contact")}
                className={`group ${base} ${active === "contact" ? activeStyle : inactiveStyle}`}
              >
                <span className={glow} />
                <span className="relative z-10">Contact</span>
              </Link>

              <a
                href={adminResume}
                target="_blank"
                onClick={() => setActive("resume")}
                className={`group ${base} ${active === "resume" ? activeStyle : inactiveStyle}`}
              >
                <span className={glow} />
                <span className="relative z-10">Resume</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT SIDE (IMAGE WRAPPER) ================= */}
          <div className="flex justify-center md:justify-end scale-in [animation-delay:450ms]">
            <div className="relative group animate-[float_6s_ease-in-out_infinite]">

              <div className="absolute inset-0 rounded-full bg-indigo-500/20 filter blur-3xl group-hover:bg-indigo-500/25 transition duration-700" />
              <div className="absolute -inset-1 rounded-full bg-linear-to-br from-indigo-400/70 via-purple-400/40 to-pink-400/60 opacity-80 transition-all duration-500" />

              <div className="relative m-3 bg-neutral-950/90 backdrop-blur-3xl rounded-full p-3 border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
                <div className="relative w-65 h-65 sm:w-75 sm:h-75 md:w-90 md:h-90 lg:w-100 lg:h-100 rounded-full overflow-hidden border border-white/20 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03] flex items-center justify-center">

                  {isLoading ? (
                    <div className="w-full h-full bg-zinc-900/50 animate-pulse flex items-center justify-center text-xs font-mono text-zinc-500">
                      Loading profile image...
                    </div>
                  ) : (
                    <Image
                      src={getImageUrl(adminImage)}
                      alt="Arya Portfolio Profile Headshot"
                      fill
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 360px, 400px"
                      priority
                      unoptimized={true}
                      className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}