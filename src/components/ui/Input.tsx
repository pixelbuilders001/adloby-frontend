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
                        className="block text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    type={type}
                    ref={ref}
                    className={cn(
                        "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
                        {
                            "border-red-500 focus:border-red-500 focus:ring-red-500": !!error,
                        },
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-500" id={`${inputId}-error`}>
                        {error}
                    </p>
                )}
                {!error && helperText && (
                    <p className="text-xs text-gray-400">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
