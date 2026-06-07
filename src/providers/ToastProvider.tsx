"use client";

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertOctagon } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import { cn } from "@/utils/cn";

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const { toasts, removeToast } = useToastStore();

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "error":
                return <AlertOctagon className="h-5 w-5 text-red-500" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case "info":
                return <Info className="h-5 w-5 text-blue-500" />;
            default:
                return null;
        }
    };

    return (
        <>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            "flex items-start gap-3 rounded-lg border bg-white p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-2",
                            {
                                "border-green-100 bg-green-50/70 text-green-800 dark:border-green-900/30 dark:bg-green-950/20 dark:text-green-300":
                                    toast.type === "success",
                                "border-red-100 bg-red-50/70 text-red-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-300":
                                    toast.type === "error",
                                "border-yellow-105 bg-yellow-50/70 text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-950/20 dark:text-yellow-300":
                                    toast.type === "warning",
                                "border-blue-105 bg-blue-50/70 text-blue-800 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-300":
                                    toast.type === "info",
                            }
                        )}
                    >
                        {getIcon(toast.type)}
                        <div className="flex-1 text-sm font-medium">{toast.message}</div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="rounded-lg p-0.5 opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
