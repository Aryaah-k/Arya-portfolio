import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/projects/`
        );

        const data = await res.json();

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}