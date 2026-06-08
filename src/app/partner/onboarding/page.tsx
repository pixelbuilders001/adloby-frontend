"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Boxes,
    HelpCircle,
    Check,
    Upload,
    Lightbulb,
    ChevronDown,
    Monitor,
    Smartphone,
    MonitorPlay,
    Brush,
    Bus,
    Plane,
    ShoppingBag,
    Globe,
    ShieldCheck,
    Calendar,
    TrendingUp,
    Headset
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

const STEPS = [
    { id: 1, title: "Basic Information", desc: "Tell us about your agency" },
    { id: 2, title: "Business Details", desc: "Company and legal information" },
    { id: 3, title: "Contact Person", desc: "Authorized person details" },
    { id: 4, title: "Documents", desc: "Upload required documents" },
    { id: 5, title: "Bank Details", desc: "For payments and settlements" },
    { id: 6, title: "Service Areas", desc: "Select your working areas" },
    { id: 7, title: "Agency Profile", desc: "Showcase your agency" },
    { id: 8, title: "Review & Submit", desc: "Review and complete" },
];

const SERVICES = [
    { id: "billboard", label: "Billboard (Hoarding)", icon: Monitor },
    { id: "unipole", label: "Unipole", icon: Smartphone },
    { id: "led", label: "LED Screen", icon: MonitorPlay },
    { id: "wall", label: "Wall Painting", icon: Brush },
    { id: "transit", label: "Transit Media", icon: Bus },
    { id: "airport", label: "Airport Media", icon: Plane },
    { id: "mall", label: "Mall Media", icon: ShoppingBag },
    { id: "other", label: "Other Outdoor Media", icon: Globe },
];

export default function OnboardingPage() {
    const [activeStep, setActiveStep] = React.useState(1);
    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-[#5B3DF5]/10">
            {/* Header */}
            <header className="h-16 border-b border-gray-100 bg-white sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-black text-xl text-[#5B3DF5]">
                    <Boxes className="h-7 w-7" />
                    <div className="flex flex-col">
                        <span className="leading-none text-xl">Adloby</span>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wide">Ad and Print Solutions</span>
                    </div>
                </Link>

                <div className="flex items-center gap-6 sm:gap-10">
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center text-slate-400">
                            <HelpCircle className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Need Help?</span>
                            <span className="text-xs font-bold text-slate-700">+91 12345 67890</span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl px-6 font-bold border-gray-200 text-slate-600">
                        Login
                    </Button>
                </div>
            </header>

            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-visible">
                {/* Sidebar Stepper (Desktop) */}
                <aside className="hidden lg:flex w-72 border-r border-gray-50 bg-white p-6 sm:p-8 flex-col gap-8 shrink-0">
                    <div className="space-y-1">
                        <h2 className="text-lg font-black tracking-tight text-slate-900">Ad Agency Onboarding</h2>
                        <p className="text-xs text-gray-400 font-medium">Join Adloby and grow your business</p>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {STEPS.map((step) => (
                            <div key={step.id} className="flex gap-4 group cursor-pointer py-3">
                                <div className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                                        activeStep === step.id
                                            ? "bg-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/20 scale-110"
                                            : activeStep > step.id
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                    )}>
                                        {activeStep > step.id ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : step.id}
                                    </div>
                                    {step.id !== STEPS.length && (
                                        <div className={cn("w-px h-full min-h-[20px]", activeStep > step.id ? "bg-green-500/30" : "bg-gray-100")} />
                                    )}
                                </div>
                                <div className="flex flex-col gap-0.5 pt-0.5">
                                    <span className={cn(
                                        "text-xs font-bold transition-colors",
                                        activeStep === step.id ? "text-[#5B3DF5]" : "text-slate-600 group-hover:text-slate-900"
                                    )}>{step.title}</span>
                                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{step.desc}</span>
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="mt-auto">
                        <div className="bg-[#5B3DF5]/5 rounded-2xl p-5 border border-[#5B3DF5]/10 flex flex-col items-center text-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#5B3DF5]">
                                <Headset className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800">Need Help?</h4>
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">We&apos;re here to help you complete onboarding.</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full text-[10px] font-bold h-8 rounded-lg border-gray-200">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Stepper */}
                <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-4 w-full">
                    <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar scroll-smooth snap-x">
                        {STEPS.map((step) => {
                            const isCurrent = activeStep === step.id;
                            const isCompleted = activeStep > step.id;
                            return (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center gap-2 shrink-0 snap-center min-w-[80px] cursor-pointer"
                                    onClick={() => setActiveStep(step.id)}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all",
                                        isCurrent
                                            ? "bg-[#5B3DF5] text-white ring-4 ring-[#5B3DF5]/10"
                                            : isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-100 text-gray-400"
                                    )}>
                                        {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-bold whitespace-nowrap uppercase tracking-wider",
                                        isCurrent ? "text-[#5B3DF5]" : "text-gray-400"
                                    )}>
                                        {step.title.split(" ")[0]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 bg-[#F8F9FB]/50 p-6 sm:p-10 lg:p-12 w-full">
                    <div className="max-w-3xl mx-auto lg:mx-0">
                        <header className="mb-8 space-y-2">
                            <span className="text-[11px] font-black uppercase text-[#5B3DF5] tracking-widest">Step {activeStep} of 8</span>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Basic Information</h1>
                            <p className="text-sm text-gray-500 font-medium">Tell us about your advertising agency</p>
                        </header>

                        <div className="space-y-8">
                            {/* Agency Logo Section */}
                            <Card className="border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-8 space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800">Agency Logo</h3>
                                    <p className="text-xs text-gray-400 -mt-2 font-medium">Upload your agency logo. This will be visible to customers.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 group cursor-pointer hover:bg-gray-50 hover:border-[#5B3DF5]/30 transition-all duration-300">
                                            <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#5B3DF5] transition-colors">
                                                <Upload className="h-5 w-5" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-bold text-slate-700">Click to upload logo</p>
                                                <p className="text-[10px] text-gray-400 font-medium mt-1">PNG, JPG or JPEG (Max. 2MB)</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#5B3DF5]/5 rounded-2xl p-6 flex gap-4 border border-[#5B3DF5]/10">
                                            <Lightbulb className="h-5 w-5 text-[#5B3DF5] shrink-0" />
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-[#5B3DF5]">Tips</h4>
                                                <ul className="text-[10px] text-slate-600 space-y-2 font-medium">
                                                    <li className="flex items-center gap-2">• Use a square logo for best results</li>
                                                    <li className="flex items-center gap-2">• Minimum size 500x500 px</li>
                                                    <li className="flex items-center gap-2">• Clear and professional logo recommended</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Agency Information Section */}
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-8 space-y-6">
                                    <h3 className="text-sm font-bold text-slate-800">Agency Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Agency Name *" placeholder="Enter agency / company name" className="text-xs font-medium placeholder:text-gray-300" />
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Business Type *</label>
                                            <div className="relative">
                                                <select className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600">
                                                    <option>Select business type</option>
                                                    <option>Private Limited</option>
                                                    <option>Proprietorship</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Year Established *</label>
                                            <div className="relative">
                                                <select className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600">
                                                    <option>Select year</option>
                                                    {[...Array(30)].map((_, i) => (
                                                        <option key={i}>{2024 - i}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">No. of Employees *</label>
                                            <div className="relative">
                                                <select className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600">
                                                    <option>Select number of employees</option>
                                                    <option>1-10</option>
                                                    <option>11-50</option>
                                                    <option>50+</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">About Your Agency *</label>
                                        <div className="relative">
                                            <textarea
                                                placeholder="Write a brief description about your agency, your experience and services..."
                                                className="w-full min-h-[120px] bg-white border border-gray-200 rounded-xl p-4 text-xs font-medium focus:ring-1 focus:ring-[#5B3DF5] outline-none resize-none placeholder:text-gray-300"
                                            />
                                            <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-300">0 / 500</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Primary Services Offered Section */}
                            <div className="space-y-4 pt-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">Primary Services Offered *</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Select all that apply</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {SERVICES.map((service) => {
                                        const Icon = service.icon;
                                        const isSelected = selectedServices.includes(service.id);
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => toggleService(service.id)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-300",
                                                    isSelected
                                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] text-[#5B3DF5] shadow-[0_4px_12px_rgba(91,61,245,0.08)]"
                                                        : "bg-white border-gray-100 text-slate-500 hover:border-gray-200 hover:shadow-sm"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                                                    isSelected ? "bg-[#5B3DF5]/10" : "bg-gray-50"
                                                )}>
                                                    <Icon className="h-4.5 w-4.5" />
                                                </div>
                                                <span className="text-[10px] font-bold text-center leading-tight">{service.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Why Join Section */}
                            <Card className="border-0 shadow-sm mt-8">
                                <CardContent className="p-8 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800">Why Join Adloby? <span className="text-gray-400 font-medium">(Optional)</span></h3>
                                        <p className="text-xs text-gray-400 font-medium">Let us know what you expect from Adloby</p>
                                    </div>
                                    <div className="relative">
                                        <select className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600">
                                            <option>Select or write your expectations...</option>
                                            <option>More Bookings</option>
                                            <option>Better Reach</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Declaration */}
                            <div className="flex items-start gap-3 py-4">
                                <input type="checkbox" className="mt-1 h-3.5 w-3.5 rounded border-gray-300 text-[#5B3DF5] focus:ring-[#5B3DF5]" />
                                <p className="text-xs font-bold text-slate-600">I hereby declare that the information provided is true and correct to the best of my knowledge.</p>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <Button className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-xl px-8 py-6 h-auto flex items-center gap-2 group transition-all active:scale-[0.98]">
                                    Save & Continue
                                    <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                        →
                                    </motion.span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Feature Footer */}
            <footer className="border-t border-gray-100 bg-white py-10 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8 lg:gap-4">
                    {[
                        { icon: ShieldCheck, title: "Verified Agencies", desc: "Get verified and trusted" },
                        { icon: Calendar, title: "More Bookings", desc: "Reach more customers" },
                        { icon: TrendingUp, title: "Grow Business", desc: "Increase your revenue" },
                        { icon: Headset, title: "24/7 Support", desc: "We are here to help" },
                    ].map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="flex items-center gap-3 group min-w-[200px]">
                                <div className="h-10 w-10 rounded-2xl bg-[#5B3DF5]/5 flex items-center justify-center text-[#5B3DF5] group-hover:bg-[#5B3DF5] group-hover:text-white transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="text-[12px] font-black text-slate-900 leading-tight">{feature.title}</h5>
                                    <p className="text-[10px] text-gray-400 font-medium">{feature.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </footer>
        </div>
    );
}
