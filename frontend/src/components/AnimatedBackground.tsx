"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-30">
      {/* MAIN AURORA BLOBS */}
      <div className="absolute top-[-350px] left-[-350px] w-[850px] h-[850px] bg-indigo-500/70 rounded-full blur-[200px] animate-[float_16s_ease-in-out_infinite] mix-blend-screen" />
      <div className="absolute bottom-[-350px] right-[-350px] w-[900px] h-[900px] bg-pink-500/70 rounded-full blur-[220px] animate-[float2_18s_ease-in-out_infinite] mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 w-[750px] h-[750px] -translate-x-1/2 -translate-y-1/2 bg-purple-500/70 rounded-full blur-[240px] animate-pulse mix-blend-screen" />
      <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] bg-cyan-400/70 rounded-full blur-[180px] animate-[float_20s_ease-in-out_infinite] mix-blend-screen" />
      <div className="absolute inset-0 bg-white/5 mix-blend-screen pointer-events-none" />
      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:80px_80px]" />
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)]" />
    </div>
  );
}