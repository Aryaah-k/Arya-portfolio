import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = body;

        // Example demo authentication
        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {
            return NextResponse.json(
                {
                    success: true,
                    token: "demo-jwt-token",
                    user: {
                        name: "Arya",
                        email: "admin@gmail.com",
                    },
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Invalid credentials",
            },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Authentication failed",
            },
            { status: 500 }
        );
    }
}