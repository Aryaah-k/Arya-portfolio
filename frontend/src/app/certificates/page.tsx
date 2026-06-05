"use client";

import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "@/app/services/endpoints"; 

interface DjangoCertificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string; 
    image: string;      
    verify_url?: string; 
    created_at: string;
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<DjangoCertificate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const targetUrl = ENDPOINTS.CERTIFICATES?.LIST || "http://localhost:8000/api/certificates/";
                const response = await fetch(targetUrl);
                
                if (!response.ok) {
                    throw new Error("Failed to pull credentials matrix from database.");
                }
                
                const data = await response.json();
                setCertificates(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    // ================= BROWSER BACK BUTTON INTERCEPTION =================
    // Fires whenever the image selection changes
    useEffect(() => {
        if (selectedImage) {
            // Push a dummy state into history so the back button acts on this state first
            window.history.pushState({ modalOpen: true }, "");
        }

        const handlePopState = () => {
            if (selectedImage) {
                // Prevent browser navigation and simply close the image canvas modal
                setSelectedImage(null);
            }
        };

        // Listen for browser navigation clicks (Back arrow trigger)
        window.addEventListener("popstate", handlePopState);
        
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [selectedImage]);

    // Custom close wrapper to manually clean up history stack if user clicks 'X' or backdrop
    const closeModal = () => {
        if (window.history.state?.modalOpen) {
            window.history.back(); // Triggers popstate listener naturally to close modal cleanly
        } else {
            setSelectedImage(null);
        }
    };

    const resolveImageUrl = (imagePath: string) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"; 
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        return `http://localhost:8000${imagePath}`;
    };

    return (
        <main className="min-h-screen bg-transparent text-white py-28 px-4 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* ================= SECTION HEADER ================= */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest">
                        Credentials Matrix
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                        Verified <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Certificates</span>
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                        Academic milestones, bootcamp completions, and specialized technical badges showcasing
                        my ongoing execution capability across architecture, full-stack pipelines, and machine learning models.
                    </p>
                </div>

                {/* ================= LOADING & ERROR STATES ================= */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20 text-red-400 font-mono text-sm border border-red-500/20 bg-red-500/5 rounded-2xl max-w-md mx-auto">
                        Connectivity Error: {error}
                    </div>
                )}

                {/* ================= CERTIFICATES GRID ================= */}
                {!loading && !error && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {certificates.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-zinc-500 font-mono text-xs uppercase tracking-wider border border-white/5 bg-zinc-950/20 rounded-3xl">
                                No records uploaded to the admin dashboard yet.
                            </div>
                        ) : (
                            certificates.map((cert) => {
                                const fullImgUrl = resolveImageUrl(cert.image);
                                return (
                                    <div
                                        key={cert.id}
                                        className="group bg-zinc-950/40 border border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col relative"
                                    >
                                        <div 
                                            onClick={() => setSelectedImage(fullImgUrl)}
                                            className="h-52 w-full overflow-hidden relative border-b border-white/5 cursor-zoom-in group/img"
                                        >
                                            <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                                <span className="text-xs font-mono tracking-widest bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm uppercase">
                                                    View Full Screen
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                                            <img
                                                src={fullImgUrl}
                                                alt={cert.title}
                                                className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />

                                            <span className="absolute top-4 right-4 z-20 px-2.5 py-1 text-[10px] font-mono font-bold bg-black/60 text-indigo-300 border border-white/10 rounded-lg backdrop-blur-md uppercase tracking-wider">
                                                {new Date(cert.issue_date).getFullYear() || cert.issue_date}
                                            </span>
                                        </div>

                                        <div className="p-6 flex flex-col grow justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                    {cert.issuer}
                                                </div>
                                                <h2 className="text-lg font-bold text-zinc-100 tracking-tight leading-snug group-hover:text-white transition-colors">
                                                    {cert.title}
                                                </h2>
                                            </div>

                                            <div className="pt-2">
                                                {cert.verify_url ? (
                                                    <a
                                                        href={cert.verify_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs font-mono text-indigo-400 group-hover:text-indigo-300 transition-colors font-medium relative cursor-pointer"
                                                    >
                                                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1px after:bg-indigo-400/50 after:scale-x-100 group-hover:after:scale-x-0 after:transition-transform after:origin-left">
                                                            Verify Credential
                                                        </span>
                                                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                                                            {"->"}
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                                                        Internal Record
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

            </div>

            {/* ================= LIGHTBOX IMAGE VIEW MODAL LAYER ================= */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    onClick={closeModal} // Safe historical back toggle
                >
                    <button 
                        className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all border border-white/5"
                        onClick={closeModal} // Safe historical back toggle
                        aria-label="Close interactive modal display overlay image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div 
                        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <img 
                            src={selectedImage} 
                            alt="Expanded database certificate credential display image view" 
                            className="max-w-full max-h-full object-contain rounded-2xl border border-white/10 shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}