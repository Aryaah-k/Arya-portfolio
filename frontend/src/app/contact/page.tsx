"use client";

import React, { useState } from "react";
import { ENDPOINTS } from "@/app/services/endpoints";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", message: "All fields must be populated." });
      return;
    }

    setStatus({ type: "loading", message: "Transmitting payload..." });

    try {
      const res = await fetch(ENDPOINTS.CONTACT.SEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Message dispatched successfully " });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Handshake rejected by server.");
      }
    } catch (error) {
      console.error(error);
      setStatus({ 
        type: "error", 
        message: "Failed to establish synchronization. Please verify endpoints." 
      });
    }
  };

  // Fixed contrast parameters for input variables
  const inputStyles = "w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 disabled:opacity-50";

  return (
    // Changed relative layers to z-20 to pull it ahead of any animated background scripts
    <main className="min-h-screen w-full bg-transparent text-white px-4 py-28 relative z-20 flex items-center justify-center">
      
      {/* IMPROVED: Bumped opacity to /85 so backdrop blur doesn't render it invisible against bright meshes */}
      <div className="w-full max-w-xl bg-zinc-950/85 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden shadow-2xl shadow-black/80">
        
        {/* Subtle internal glowing ambient highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-linear-to-r from-indigo-500/20 to-transparent blur-xl pointer-events-none" />

        {/* ================= SECTION HEADER ================= */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Get In <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Touch</span> 
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm font-mono">
            Have a project or system architecture query? Drop a line.
          </p>
        </div>

        {/* ================= STATUS BANNER TELEMETRY ================= */}
        {status.type !== "idle" && (
          <div 
            className={`p-4 rounded-xl text-xs font-mono border transition-all duration-300 relative z-10 ${
              status.type === "loading" ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" :
              status.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" :
              "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {status.type === "loading" && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />}
              {status.type === "success" && <span className="text-emerald-400"></span>}
              {status.type === "error" && <span className="text-rose-400"></span>}
              {status.message}
            </div>
          </div>
        )}

        {/* ================= DATA INTERACTION FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1 block">Your Identification</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                disabled={status.type === "loading"}
                className={inputStyles}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1 block">Callback Channel</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                disabled={status.type === "loading"}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1 block">Routing Directive</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject topic"
              value={form.subject}
              onChange={handleChange}
              disabled={status.type === "loading"}
              className={inputStyles}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1 block">Payload Content</label>
            <textarea
              name="message"
              placeholder="Compile your detailed message transmission here..."
              value={form.message}
              onChange={handleChange}
              disabled={status.type === "loading"}
              rows={5}
              className={`${inputStyles} resize-none`}
            />
          </div>

          {/* Action Submission Trigger */}
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full mt-2 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-zinc-900 text-white disabled:text-zinc-500 text-sm font-semibold rounded-xl transition-all shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            {status.type === "loading" ? "Processing Socket Streams..." : "Transmit Message"}
          </button>
        </form>

      </div>
    </main>
  );
}