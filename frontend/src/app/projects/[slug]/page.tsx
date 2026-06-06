import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// Fallback data in case the Django backend is offline
type ProjectDetail = {
    title: string;
    description: string;
    tech?: string[];
    image?: string;
    github?: string;
    live?: string;
};

const fallbackProjects: Record<string, ProjectDetail> = {
    "ai-job-portal": {
        title: "AI Job Portal",
        description:
            "A full-stack AI-powered job portal built with Django REST Framework, React.js, Tailwind CSS, and Machine Learning integration. This platform streamlines the hiring process by automatically matching candidates to suitable job postings based on their resumes and skill sets.",
        tech: ["Django", "React", "Tailwind", "PostgreSQL", "Scikit-learn"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        github: "https://github.com",
        live: "https://example.com"
    },
    "disease-prediction-system": {
        title: "Disease Prediction System",
        description:
            "An ML-powered healthcare prediction system that assists medical professionals in diagnosing diseases like diabetes, heart disease, and breast cancer. By analyzing patient data using advanced algorithms, it provides accurate risk assessments and early warnings.",
        tech: ["Python", "Django", "Scikit-learn", "Bootstrap"],
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=1200",
        github: "https://github.com"
    },
};

async function getProject(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://arya-portfolio-backend-d4hmfqbjfpfrb2dv.southindia-01.azurewebsites.net"}/api/projects/${slug}`, {
            // Next.js caching options
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch project");
        }
        
        return await res.json();
    } catch (error) {
        // If backend is offline or fetch fails, use fallback data for a smooth user experience
        console.warn(`API fetch failed for ${slug}, using fallback data if available.`, error);
        return fallbackProjects[slug] || null;
    }
}

export default async function ProjectDetails({ params }: Props) {
    // Next.js 15+ requires awaiting params
    const resolvedParams = await params;
    const project = await getProject(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto py-24 px-6 md:px-12 lg:px-16">
                
                {/* Back Button */}
                <Link 
                    href="/projects" 
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-100 to-indigo-300 text-transparent bg-clip-text">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech?.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-indigo-200 backdrop-blur-md shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/10 group">
                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6 text-gray-300 leading-relaxed text-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">About the Project</h2>
                        <p>{project.description}</p>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-xl font-semibold text-white mb-4">Project Links</h3>
                            <div className="flex flex-col gap-4">
                                {project.github && (
                                    <a 
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                        View Source Code
                                    </a>
                                )}
                                {project.live && (
                                    <a 
                                        href={project.live} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-medium shadow-lg shadow-indigo-500/25"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Visit Live Site
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}