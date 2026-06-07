import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
        const defaultId = React.useId();
        const inputId = id || defaultId;

        return (
            <div className="w-full space-y-1.5 text-left">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 dark:text-zinc-350"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    type={type}
                    ref={ref}
                    className={cn(
                        "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                        {
                            "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-550 dark:focus:border-red-550 dark:focus:ring-red-550": !!error,
                        },
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-500 dark:text-red-400" id={`${inputId}-error`}>
                        {error}
                    </p>
                )}
                {!error && helperText && (
                    <p className="text-xs text-gray-400 dark:text-zinc-500">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
