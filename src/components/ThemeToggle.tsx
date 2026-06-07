"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 font-medium">
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-all" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
