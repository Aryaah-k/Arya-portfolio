"use client";

import { useEffect, useRef, useState } from "react";

export default function Skills() {
  // Categorized structural data mapping out your full stack ecosystem
  const skillCategories = [
    {
      title: "Backend Development",
      icon: "",
      items: ["Python", "Django", "Flask", "Django REST Framework", "MVC Architecture", "Auth & Authorization", "CRUD Operations"],
    },
    {
      title: "Frontend Development",
      icon: "",
      items: ["JavaScript", "React.js", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      title: "API & Databases",
      icon: "",
      items: ["REST APIs", "PostgreSQL", "MySQL", "MongoDB", "SQL Server", "API Testing (Postman)", "Database Design"],
    },
    {
      title: "Machine Learning",
      icon: "",
      items: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Feature Engineering", "Model Evaluation"],
    },
    {
      title: "Cloud, Tools & Practices",
      icon: "",
      items: ["Docker", "Git / GitHub", "Vercel", "Render", "Agile Development"],
    },
    {
      title: "Soft Skills",
      icon: "",
      items: ["Problem Solving", "Teamwork", "Leadership", "Adaptability", "Time Management"],
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-transparent text-white px-6 overflow-hidden relative"
    >
      {/* Structural ambient glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className={`text-center mb-20 space-y-3 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Ecosystem</span> 
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto">
            A comprehensive look at the languages, architectures, and systems I work with.
          </p>
        </div>

        {/* Categorized Architecture Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`group relative flex flex-col bg-zinc-900/20 border border-zinc-800/60 hover:border-indigo-500/30 rounded-2xl p-6 overflow-hidden backdrop-blur-md transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(99,102,241,0.03)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
              style={{
                transitionDelay: isVisible ? `${catIndex * 100}ms` : "0ms"
              }}
            >
              {/* Card Ambient Glow Flash */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/60 pb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-bold text-base md:text-lg text-zinc-200 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Sub-Badges Cluster */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Tiny Technical Frame Decorator */}
              <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                SEC_0{catIndex + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}