"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    React.useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center dark:bg-zinc-950">
            <div className="max-w-md space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-650 dark:bg-red-950/30 dark:text-red-450">
                    <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Something went wrong!
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400">
                        {error.message || "An unexpected system error occurred."}
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={reset} variant="primary">
                        Try again
                    </Button>
                    <Button onClick={() => (window.location.href = "/")} variant="outline">
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    );
}
