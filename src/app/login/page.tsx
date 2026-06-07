"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/validations/auth";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { KeyRound } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const login = useAuthStore((state) => state.login);
    const addToast = useToastStore((state) => state.addToast);
    const [loading, setLoading] = React.useState(false);

    const from = searchParams.get("from") || "/dashboard";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchemaType) => {
        setLoading(true);
        try {
            const response = await authService.login(data);
            login(response.user, response.token);
            addToast("Successfully logged in!", "success");
            router.push(from);
        } catch (error) {
            const err = error as Error;
            addToast(err.message || "Invalid credentials", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 relative">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                        <KeyRound className="h-6 w-6" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-950">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-505">
                        Use email <span className="font-semibold text-blue-600">admin@example.com</span> and password <span className="font-semibold text-blue-600">password123</span>
                    </p>
                </div>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter email security credentials to sign in
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="admin@example.com"
                                error={errors.email?.message}
                                {...register("email")}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password")}
                            />
                            <Button type="submit" className="w-full font-medium" isLoading={loading}>
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
