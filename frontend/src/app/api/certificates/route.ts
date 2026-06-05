import { NextResponse } from "next/server";

export async function GET() {
    try {
        const certificates = [
            {
                id: 1,
                title: "Python Full Stack Development",
                issuer: "Udemy",
                date: "2025",
                image:
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
                link: "#",
            },

            {
                id: 2,
                title: "Machine Learning with Python",
                issuer: "Coursera",
                date: "2025",
                image:
                    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
                link: "#",
            },

            {
                id: 3,
                title: "React & Next.js Bootcamp",
                issuer: "Infosys Springboard",
                date: "2024",
                image:
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                link: "#",
            },
        ];

        return NextResponse.json(certificates);
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch certificates",
            },
            { status: 500 }
        );
    }
}