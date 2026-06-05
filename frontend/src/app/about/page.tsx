"use client";

import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState("stack");

  // Statistical data matrices
  const stats = [
    { value: "5+", label: "GitHub Repositories" },
    { value: "99.9%", label: "API Uptime Standard" },
    { value: "3+", label: "Production Apps Built" },
  ];

  const architecturalPillars = [
    { title: "Scalable Core Architecture", desc: "Crafting structured, testable Django and Next.js applications using decoupled service-layer paradigms.", icon: "" },
    { title: "Asynchronous Workflows", desc: "Deploying production-grade distributed tasks, background worker queues, and efficient caching routines.", icon: "" },
    { title: "Relational Database Management", desc: "Designing ACID-compliant PostgreSQL configurations with optimized query pipelines and index matrices.", icon: "" },
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-transparent text-white px-4 md:px-8 relative z-10 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-16">

        {/* ================= SECTION HEADER ================= */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 uppercase tracking-widest">
            System Overview
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">The Engineer</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            Bridging the gap between beautiful client interfaces and highly efficient data pipelines.
          </p>
        </div>

        {/* ================= HERO METRICS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 group-hover:to-indigo-400 transition-all">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ================= MAIN INTERACTIVE LAYOUT (BENTO MATRIX) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Left Column: Narrative Box (Span 3) */}
          <div className="lg:col-span-3 space-y-6 p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-500" />

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Philosophy & Focus</span> 
            </h2>

            <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed font-light">
              <p>
                I architect software infrastructure with a deep commitment to code modularity and runtime execution speed. Specializing in the
                <strong className="text-white font-medium"> Python and JavaScript ecosystems</strong>, I construct robust server instances combined with modern reactive client dashboards.
              </p>
              <p>
                Whether designing REST APIs in Django or optimizing server-side layouts inside Next.js, my execution model centers on production readiness, type safety, and clean documentation.
              </p>
            </div>

            {/* Tab Swapping Control Interface */}
            <div className="pt-4 flex border-b border-white/5 gap-6">
              <button
                onClick={() => setActiveTab("stack")}
                className={`pb-2 text-xs font-mono uppercase tracking-widest border-b-2 transition-all ${activeTab === "stack" ? "border-indigo-400 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
              >
                Technology Stack
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`pb-2 text-xs font-mono uppercase tracking-widest border-b-2 transition-all ${activeTab === "architecture" ? "border-indigo-400 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
              >
                System Blueprint
              </button>
            </div>

            {/* Tab Changing Content Blocks */}
            <div className="min-h-[100px]">
              {activeTab === "stack" ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Django", "React.js", "Next.js", "Tailwind CSS", "PostgreSQL", "REST APIs", "Git & CI/CD", "TypeScript"].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 text-xs font-medium font-mono bg-white/[0.02] border border-white/5 rounded-xl text-zinc-400 hover:text-indigo-300 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-zinc-400 font-mono leading-relaxed space-y-2 pt-2 bg-black/20 p-4 rounded-xl border border-white/[0.02]">
                  <div> <span className="text-white">Backend Flow:</span> Django Core + REST Framework + Relational Middleware</div>
                  <div> <span className="text-white">Frontend Flow:</span> Next.js App Routing + State Ingestion + Tailwind V4 Context</div>
                  <div> <span className="text-white">Data Strategy:</span> ACID Schema Configuration + Optimized Indices</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Pillar Grid (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            {architecturalPillars.map((pillar, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-zinc-900/20 border border-white/[0.03] hover:border-white/10 hover:bg-zinc-900/40 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-lg group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                  {pillar.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}