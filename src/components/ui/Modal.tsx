"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            {/* Modal Content */}
            <div
                className={cn(
                    "relative z-10 w-full max-w-lg scale-100 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-950",
                    className
                )}
            >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                    {title ? (
                        <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                            {title}
                        </h3>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 hover:bg-gray-105 hover:text-gray-900 transition-colors dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>,
        document.body
    );
}
