import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Contact Form Data:", body);

        return NextResponse.json(
            {
                success: true,
                message: "Message received successfully",
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}