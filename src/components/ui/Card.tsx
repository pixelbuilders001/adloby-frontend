import * as React from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pb-3", className)} {...props} />;
}

export function CardTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-xl font-semibold leading-none tracking-tight text-gray-950", className)}
            {...props}
        />
    );
}

export function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-gray-500", className)}
            {...props}
        />
    );
}

export function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pt-3", className)} {...props} />;
}

export function CardFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center p-6 pt-3 border-t border-gray-100", className)}
            {...props}
        />
    );
}
