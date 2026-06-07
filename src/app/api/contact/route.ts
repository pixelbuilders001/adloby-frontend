import { NextResponse } from "next/server";
import { contactSchema } from "@/validations/contact";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Form submitted successfully! We will get back to you soon.",
        });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json(
            { message: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
