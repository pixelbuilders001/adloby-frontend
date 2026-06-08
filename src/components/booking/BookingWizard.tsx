"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    ArrowLeft,
    AlertCircle,
    HelpCircle,
    X,
    MapPin,
    Monitor,
    MonitorPlay,
    Building2,
    Calendar,
    LayoutTemplate,
    Search,
    ShieldCheck,
    TrendingUp,
    Headset,
    Boxes,
    Edit2
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Import steps
import SelectCity from "@/components/booking/steps/SelectCity";
import MediaType from "@/components/booking/steps/MediaType";
import SelectLocation from "@/components/booking/steps/SelectLocation";
import SelectSize from "@/components/booking/steps/SelectSize";
import SelectDuration from "@/components/booking/steps/SelectDuration";
import DesignOption from "@/components/booking/steps/DesignOption";
import ChooseTemplate from "@/components/booking/steps/ChooseTemplate";
import ReviewBooking from "@/components/booking/steps/ReviewBooking";
import BookingConfirmation from "@/components/booking/steps/BookingConfirmation";

const STEPS = [
    { id: 1, label: "Select City", icon: MapPin },
    { id: 2, label: "Media Type", icon: Monitor },
    { id: 3, label: "Location", icon: MapPin },
    { id: 4, label: "Size", icon: MonitorPlay },
    { id: 5, label: "Duration", icon: Calendar },
    { id: 6, label: "Design Option", icon: Building2 },
    { id: 7, label: "Choose Template", icon: LayoutTemplate },
    { id: 8, label: "Review", icon: ShieldCheck },
    { id: 9, label: "Confirmation", icon: Check },
];

export default function BookingWizard() {
    const { activeStep, setStep } = useBookingStore();

    const renderStep = () => {
        switch (activeStep) {
            case 1: return <SelectCity />;
            case 2: return <MediaType />;
            case 3: return <SelectLocation />;
            case 4: return <SelectSize />;
            case 5: return <SelectDuration />;
            case 6: return <DesignOption />;
            case 7: return <ChooseTemplate />;
            case 8: return <ReviewBooking />;
            case 9: return <BookingConfirmation />;
            default: return <SelectCity />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans">
            {/* Top Stepper - Desktop Centered / Mobile Full */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-[#5B3DF5] flex items-center justify-center text-white shadow-lg shadow-[#5B3DF5]/20">
                                <Boxes className="h-6 w-6" />
                            </div>
                            <span className="font-black text-xl tracking-tight text-slate-900">Adloby</span>
                        </Link>
                    </div>

                    {/* Stepper Dots */}
                    <div className="hidden lg:flex items-center gap-4">
                        {STEPS.map((step) => (
                            <div key={step.id} className="flex items-center">
                                <button
                                    onClick={() => step.id < activeStep && setStep(step.id)}
                                    disabled={step.id >= activeStep}
                                    className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                                        activeStep === step.id
                                            ? "border-[#5B3DF5] bg-[#5B3DF5] text-white shadow-lg"
                                            : activeStep > step.id
                                                ? "border-green-500 bg-green-500 text-white"
                                                : "border-gray-200 bg-white text-gray-400"
                                    )}
                                >
                                    {activeStep > step.id ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{step.id}</span>}
                                </button>
                                {step.id < STEPS.length && (
                                    <div className={cn(
                                        "w-4 h-0.5 mx-1 rounded-full",
                                        activeStep > step.id ? "bg-green-500" : "bg-gray-200"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-slate-900 transition-colors">
                            <HelpCircle className="h-5 w-5" />
                        </button>
                        <Link href="/" className="p-2 text-gray-400 hover:text-slate-900 transition-colors">
                            <X className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Scroller Stepper */}
                <div className="lg:hidden px-4 pb-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-6 min-w-max">
                        {STEPS.map((step) => (
                            <div key={step.id} className="flex items-center gap-3">
                                <div className={cn(
                                    "h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                                    activeStep === step.id
                                        ? "bg-[#5B3DF5] text-white"
                                        : activeStep > step.id
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100 text-gray-400"
                                )}>
                                    {activeStep > step.id ? <Check className="h-3 w-3" /> : step.id}
                                </div>
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-wider",
                                    activeStep === step.id ? "text-slate-900" : "text-gray-400"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Desktop Sidebar - Booking Summary */}
                    <div className="hidden lg:block lg:col-span-4 sticky top-32">
                        <BookingSummarySidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}

function BookingSummarySidebar() {
    const { activeStep, selectedCity, mediaType, location, size, duration, calculateTotal, designOption, setStep } = useBookingStore();
    const total = calculateTotal();

    if (activeStep === 9) return null;

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-black text-lg text-slate-900 mb-6">Booking Summary</h3>

            <div className="space-y-4 mb-8">
                <SummaryItem label="City" value={selectedCity} onEdit={() => setStep(1)} />
                <SummaryItem label="Media Type" value={mediaType} onEdit={() => setStep(2)} />
                <SummaryItem label="Location" value={location?.name} onEdit={() => setStep(3)} />
                <SummaryItem label="Size" value={size?.label} onEdit={() => setStep(4)} />
                <SummaryItem label="Duration" value={duration?.label} onEdit={() => setStep(5)} />
                {designOption && <SummaryItem label="Design" value={designOption} onEdit={() => setStep(6)} />}
            </div>

            <div className="pt-6 border-t border-gray-50 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>₹{total > 0 ? Math.round(total / 1.18 - 100).toLocaleString() : 0}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Platform Fee</span>
                    <span>₹100</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>GST (18%)</span>
                    <span>₹{total > 0 ? Math.round(total - (total / 1.18)).toLocaleString() : 0}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="font-black text-slate-900">Final Price</span>
                    <span className="text-2xl font-black text-[#5B3DF5]">₹{total.toLocaleString()}</span>
                </div>
            </div>

            <p className="text-[10px] text-gray-400 font-medium mt-6 text-center leading-relaxed">
                Prices are estimated and may vary based on actual availability at the time of booking.
            </p>
        </div>
    );
}

function SummaryItem({ label, value, onEdit }: { label: string; value?: string; onEdit: () => void }) {
    if (!value) return null;
    return (
        <div className="flex justify-between items-center group">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</span>
                <span className="text-sm font-bold text-slate-800 capitalize">{value}</span>
            </div>
            <button
                onClick={onEdit}
                className="p-1.5 rounded-lg text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-50 hover:text-[#5B3DF5] transition-all"
            >
                <Edit2 className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
