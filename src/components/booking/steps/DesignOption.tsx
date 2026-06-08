"use client";

import * as React from "react";
import { Upload, LayoutTemplate, Palette, Check, ArrowLeft } from "lucide-react";
import { useBookingStore, DesignOption as DesignOptionType } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const OPTIONS = [
    {
        id: "own",
        title: "Upload My Own Design",
        desc: "I have my own design ready for print",
        icon: Upload
    },
    {
        id: "template",
        title: "Choose From Templates",
        desc: "Browse and select from our high-quality templates",
        icon: LayoutTemplate
    },
    {
        id: "custom",
        title: "Custom Design",
        desc: "Get a professional design created by our agency",
        icon: Palette
    },
];

export default function DesignOption() {
    const { designOption: selectedOpt, updateBooking, nextStep, prevStep } = useBookingStore();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">Design Option</h2>
                <p className="text-gray-400 font-medium tracking-wide">How would you like to handle the advertisement design?</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-4">
                {OPTIONS.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const Icon = opt.icon;

                    return (
                        <button
                            key={opt.id}
                            onClick={() => updateBooking({ designOption: opt.id as DesignOptionType })}
                            className={cn(
                                "w-full flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-3xl border lg:border-2 transition-all duration-300 group active:scale-[0.99]",
                                isSelected
                                    ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_8px_20px_rgba(91,61,245,0.08)]"
                                    : "bg-white border-gray-50 hover:border-gray-100 hover:bg-gray-50/50"
                            )}
                        >
                            <div className={cn(
                                "h-10 w-10 lg:h-14 lg:w-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                                isSelected ? "bg-[#5B3DF5] text-white shadow-lg" : "bg-gray-50 text-slate-400 group-hover:bg-white"
                            )}>
                                <Icon className="h-5 w-5 lg:h-7 lg:w-7" />
                            </div>

                            <div className="flex flex-col items-start gap-0.5 flex-1 text-left">
                                <span className={cn(
                                    "text-base lg:text-lg font-bold lg:font-black tracking-tight",
                                    isSelected ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                                )}>
                                    {opt.title}
                                </span>
                                <span className="text-[10px] lg:text-xs text-gray-400 font-medium leading-relaxed">
                                    {opt.desc}
                                </span>
                            </div>

                            <div className={cn(
                                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                isSelected
                                    ? "bg-[#5B3DF5] border-[#5B3DF5] text-white"
                                    : "border-gray-200"
                            )}>
                                {isSelected && <Check className="h-3 w-3" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="lg:hidden h-24" />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 lg:p-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-bold lg:pt-8 bg-white lg:bg-transparent p-4 lg:p-0 rounded-t-[32px] lg:rounded-none shadow-2xl lg:shadow-none">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        className="rounded-xl px-6 lg:px-8 py-5 lg:py-7 h-auto border-gray-100 text-slate-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>

                    <Button
                        onClick={nextStep}
                        disabled={!selectedOpt}
                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-xl lg:rounded-2xl px-12 py-5 lg:py-7 h-auto flex-1 lg:flex-none shadow-lg shadow-[#5B3DF5]/20 disabled:grayscale disabled:opacity-50 transition-all font-sans"
                    >
                        Next Step
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-2">
                            →
                        </motion.span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
