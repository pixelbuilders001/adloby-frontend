import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Simple mock validation logic
        if (email === "admin@example.com" && password === "password123") {
            return NextResponse.json({
                user: {
                    id: "1",
                    name: "Admin User",
                    email: "admin@example.com",
                    role: "admin",
                },
                token: "mock-jwt-token-xyz-12345",
            });
        }

        return NextResponse.json(
            { message: "Invalid email or password. Use admin@example.com / password123" },
            { status: 401 }
        );
    } catch (error) {
        const err = error as Error;
        return NextResponse.json(
            { message: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
