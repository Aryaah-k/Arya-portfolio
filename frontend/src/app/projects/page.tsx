"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ENDPOINTS } from "@/app/services/endpoints"; 

interface BackendProject {
    id: number;
    title: string;
    slug: string;
    tech_stack: string; 
    description: string;
    image: string | null;      
    github_link?: string; // Match: django github_link
    live_demo?: string;   // Match: django live_demo
    created_at: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<BackendProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const targetUrl = ENDPOINTS.PROJECTS?.LIST || "http://localhost:8000/api/projects/";
                const response = await fetch(targetUrl);
                
                if (!response.ok) {
                    throw new Error("Could not pull current repository logs from database server.");
                }
                
                const data = await response.json();
                setProjects(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "An unexpected network error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const resolveImageUrl = (imagePath: string | null) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        return `http://localhost:8000${imagePath}`;
    };

    return (
        <main className="min-h-screen bg-transparent text-white px-6 md:px-16 py-24 relative z-20">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-4xl font-black mb-12 text-center tracking-tight">
                    Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Projects</span>
                </h1>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-400 font-mono text-xs border border-red-500/20 bg-red-500/5 rounded-2xl max-w-md mx-auto">
                        Data Fetch Error: {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-zinc-500 font-mono text-xs uppercase border border-white/5 bg-zinc-950/20 rounded-2xl">
                                Project list is empty. Add records via Django Admin.
                            </div>
                        ) : (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-zinc-900/60 border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <img
                                        src={resolveImageUrl(project.image)}
                                        alt={project.title}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="p-5 grow flex flex-col justify-between space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold tracking-tight text-zinc-100">
                                                    {project.title}
                                                </h2>
                                                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {project.tech_stack && (
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {project.tech_stack.split(",").map((tech, idx) => (
                                                        <span 
                                                            key={idx}
                                                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider"
                                                        >
                                                            {tech.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4 border-t border-white/5 pt-4">
                                            <div className="flex items-center gap-4">
                                                {/* Adjusted to use project.live_demo */}
                                                {project.live_demo ? (
                                                    <a
                                                        href={project.live_demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 text-center py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                                                    >
                                                        Live Demo
                                                    </a>
                                                ) : (
                                                    <span className="flex-1 text-center py-2 bg-zinc-800/20 text-zinc-600 font-medium text-xs rounded-xl border border-white/5 select-none line-through">
                                                        No Live Demo
                                                    </span>
                                                )}

                                                {/* Adjusted to use project.github_link */}
                                                {project.github_link ? (
                                                    <a
                                                        href={project.github_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 text-center py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl border border-white/5 transition-all active:scale-95 cursor-pointer"
                                                    >
                                                        GitHub
                                                    </a>
                                                ) : (
                                                    <span className="flex-1 text-center py-2 bg-zinc-800/20 text-zinc-600 font-medium text-xs rounded-xl border border-white/5 select-none line-through">
                                                        Private Code
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 hover:text-white block text-center transition-colors duration-200"
                                            >
                                                Read Documentation {"->"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>
        </main>
    );
}