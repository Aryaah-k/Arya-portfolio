const skills = [
    {
        category: "Programming Languages",
        items: ["Python", "JavaScript", "TypeScript"],
    },
    {
        category: "Frontend Development",
        items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    },
    {
        category: "Backend Development",
        items: ["Django", "DRF", "Flask", "REST APIs", "Auth"],
    },
    {
        category: "Database",
        items: ["PostgreSQL", "MySQL", "SQLite"],
    },
    {
        category: "AI / ML",
        items: ["Scikit-learn", "Pandas", "NumPy"],
    },
    {
        category: "Tools",
        items: ["Git", "GitHub", "Vercel", "Docker"],
    },
];

export default function SkillsPage() {
    return (
        <main className="min-h-screen bg-[#05060a] text-white py-28 px-6 md:px-16 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-200px] left-[-200px] w-[450px] h-[450px] bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-[-200px] right-[-200px] w-[450px] h-[450px] bg-pink-500/20 blur-3xl rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        My Skills
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Technologies I use to build modern full-stack and AI applications.
                    </p>
                </div>

                {/* GRID (smaller + tighter) */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {skills.map((skill) => (
                        <div
                            key={skill.category}
                            className="group relative bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl
                            transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]
                            hover:-translate-y-1"
                        >
                            {/* Glow overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl" />

                            {/* Title (smaller) */}
                            <h2 className="text-sm md:text-base font-semibold mb-3 relative z-10 text-indigo-300">
                                {skill.category}
                            </h2>

                            {/* Skills chips (smaller) */}
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-xs rounded-full
                                        bg-black/40 border border-white/10 text-gray-300
                                        hover:text-white hover:border-indigo-400 hover:bg-indigo-500/10
                                        transition"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}