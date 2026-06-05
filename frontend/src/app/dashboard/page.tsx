"use client";

import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/app/services/endpoints";
import Loader from "@/components/Loader";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch contact messages from your Django backend
  useEffect(() => {
    fetch(ENDPOINTS.CONTACT.LIST, {
      method: "GET",
      headers: { "Accept": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setErrorMsg("Failed to synchronize inbox telemetry.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Async operational message purge mapped directly to your database
  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record from the database?")) return;

    try {
      const response = await fetch(ENDPOINTS.CONTACT.DELETE(id), {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to purge data entry from storage.");

      // If network confirms request deletion, slice record out of local UI array
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Purge Error:", err);
      alert("Error processing record destruction operation.");
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-white px-4 md:px-12 lg:px-16 py-28 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ================= HEADER CONTROL BARS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
              Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Panel</span>
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-mono mt-1">
              Live telemetry, system diagnostics, and client messaging pipelines.
            </p>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/10 hover:scale-[1.02] active:scale-95">
            + Add Project
          </button>
        </div>

        {/* ================= TELEMETRY METRIC GRID ================= */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="bg-zinc-900/30 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-white/10 transition-colors">
            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1">Total Projects</h2>
            <p className="text-4xl font-black tracking-tight">12</p>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-white/10 transition-colors">
            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1">Certificates</h2>
            <p className="text-4xl font-black tracking-tight">8</p>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 backdrop-blur-md rounded-2xl p-6 border-indigo-500/20 bg-indigo-500/5 transition-colors">
            <h2 className="text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">Inbound Logs</h2>
            <p className="text-4xl font-black tracking-tight text-indigo-300">{isLoading ? "..." : messages.length}</p>
          </div>
        </div>

        {/* ================= MESSAGING MANAGEMENT PANEL ================= */}
        <div className="bg-zinc-950/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Incoming Communications
            </h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
              Live Feed
            </span>
          </div>

          {/* Conditional UI Rendering Loop */}
          {isLoading ? (
            <div className="py-12"><Loader /></div>
          ) : errorMsg ? (
            <div className="p-6 text-center rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-sm font-mono">
              {errorMsg}
            </div>
          ) : messages.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 font-light text-sm">
              No communications received yet.
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-zinc-900/40 p-5 rounded-2xl border border-white/[0.03] hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-4 group relative overflow-hidden"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">{msg.name}</h3>
                      <span className="text-xs font-mono text-indigo-400 font-light">{msg.email}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                        <span className="text-xs text-zinc-600">SUB:</span> {msg.subject}
                      </div>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-600 pt-1">
                      TIMESTAMP: {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>

                  {/* Operational Management Actions */}
                  <div className="flex items-center gap-2 self-end md:self-start md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2 md:pt-0">
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 text-xs font-mono tracking-tight transition-all cursor-pointer"
                    >
                      Purge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}