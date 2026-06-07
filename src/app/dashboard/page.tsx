"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, User, Shield, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuthStore();
    const addToast = useToastStore((state) => state.addToast);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        addToast("Logged out successfully", "info");
        router.push("/login");
    };

    React.useEffect(() => {
        if (mounted && !isAuthenticated) {
            router.push("/login");
        }
    }, [mounted, isAuthenticated, router]);

    if (!mounted || !isAuthenticated || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center space-y-4">
                    <div className="h-10 w-10 animate-spin border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto dark:border-zinc-800 dark:border-t-blue-500" />
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Verifying session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-905 dark:bg-zinc-950 dark:text-zinc-100">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                        <span>Developer Console</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-400">
                        This page represents a secure, client-side verified route.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="grid gap-0.5">
                                <CardTitle className="text-lg">User Profile Information</CardTitle>
                                <CardDescription>Authenticated meta-data object</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between border-b pb-2 dark:border-zinc-800/80">
                                <span className="text-sm text-gray-500 dark:text-zinc-400">Name</span>
                                <span className="font-semibold">{user.name}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2 dark:border-zinc-800/80">
                                <span className="text-sm text-gray-500 dark:text-zinc-400">Email Address</span>
                                <span className="font-semibold">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500 dark:text-zinc-400">System Role</span>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-950/40 dark:text-blue-300">
                                    {user.role}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                <Shield className="h-5 w-5" />
                            </div>
                            <div className="grid gap-0.5">
                                <CardTitle className="text-lg">Route Middleware Security</CardTitle>
                                <CardDescription>Edge-matching routing configuration</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-500 dark:text-zinc-400">
                                The layout route uses Next.js Edge Middleware to intercept incoming requests for <code className="rounded bg-gray-100 px-1 dark:bg-zinc-800">/dashboard</code>. If the cookie token does not exist, the user is immediately redirected to login.
                            </p>
                            <div className="rounded-lg bg-zinc-100 p-3 text-xs font-mono text-zinc-900 dark:bg-zinc-900 dark:text-zinc-350">
                                <li>
                                    Edit &quot;src/app/page.tsx&quot; to design features
                                </li>
                                <li>
                                    Inspect Zustand store in &quot;src/store/&quot;
                                </li>
                                <li>
                                    Implement services in &quot;src/services/&quot;
                                </li>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
