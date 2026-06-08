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
    Headset,
    CreditCard,
    MapPin,
    Briefcase,
    FileCheck,
    ArrowLeft,
    CheckCircle2,
    Building2,
    Info
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
    const logoInputRef = React.useRef<HTMLInputElement>(null);
    const docInputRef = React.useRef<HTMLInputElement>(null);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [formData, setFormData] = React.useState({
        // Step 1: Basic
        agencyName: "",
        businessType: "",
        yearEstablished: "",
        employeeCount: "",
        about: "",
        selectedServices: [] as string[],
        logo: null as File | null,

        // Step 2: Business
        regNo: "",
        gstin: "",
        pan: "",
        regAddress: "",

        // Step 3: Contact
        contactName: "",
        designation: "",
        email: "",
        mobile: "",

        // Step 4: Documents (Files)
        gstCert: null as File | null,
        panCopy: null as File | null,
        businessProof: null as File | null,

        // Step 5: Bank
        accName: "",
        accNo: "",
        ifsc: "",
        bankName: "",

        // Step 6: Service Areas
        cities: "",
        states: "",

        // Step 7: Profile
        experience: "",
        topClients: "",
        portfolioUrl: ""
    });

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors.length > 0) setErrors([]);
    };

    const isStepValid = () => {
        const newErrors: string[] = [];

        if (activeStep === 1) {
            if (!formData.agencyName) newErrors.push("Agency Name");
            if (!formData.businessType) newErrors.push("Business Type");
            if (!formData.yearEstablished) newErrors.push("Year Established");
            if (!formData.employeeCount) newErrors.push("Employee Count");
            if (!formData.about) newErrors.push("About Agency");
            if (formData.selectedServices.length === 0) newErrors.push("Primary Services");
        } else if (activeStep === 2) {
            if (!formData.regNo) newErrors.push("Registration No");
            if (!formData.gstin) newErrors.push("GSTIN");
            if (!formData.pan) newErrors.push("PAN");
            if (!formData.regAddress) newErrors.push("Registered Address");
        } else if (activeStep === 3) {
            if (!formData.contactName) newErrors.push("Contact Name");
            if (!formData.designation) newErrors.push("Designation");
            if (!formData.email) newErrors.push("Email");
            if (!formData.mobile) newErrors.push("Mobile");
        } else if (activeStep === 5) {
            if (!formData.accName) newErrors.push("Account Name");
            if (!formData.accNo) newErrors.push("Account Number");
            if (!formData.ifsc) newErrors.push("IFSC Code");
            if (!formData.bankName) newErrors.push("Bank Name");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const nextStep = () => {
        if (isStepValid()) {
            if (activeStep < STEPS.length) setActiveStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (activeStep > 1) setActiveStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleService = (id: string) => {
        const prev = formData.selectedServices;
        const newValue = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
        updateFormData("selectedServices", newValue);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            updateFormData(field, file);
        }
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
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {STEPS.find(s => s.id === activeStep)?.title}
                            </h1>
                            <p className="text-sm text-gray-500 font-medium">
                                {STEPS.find(s => s.id === activeStep)?.desc}
                            </p>
                        </header>

                        <div className="space-y-8">
                            {activeStep === 1 && (
                                <>
                                    {/* Agency Logo Section */}
                                    <input
                                        type="file"
                                        ref={logoInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, "logo")}
                                    />
                                    <Card className="border-0 shadow-sm overflow-hidden">
                                        <CardContent className="p-8 space-y-4">
                                            <h3 className="text-sm font-bold text-slate-800">Agency Logo</h3>
                                            <p className="text-xs text-gray-400 -mt-2 font-medium">Upload your agency logo. This will be visible to customers.</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                <div
                                                    onClick={() => logoInputRef.current?.click()}
                                                    className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 group cursor-pointer hover:bg-gray-50 hover:border-[#5B3DF5]/30 transition-all duration-300"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#5B3DF5] transition-colors">
                                                        <Upload className="h-5 w-5" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xs font-bold text-slate-700">
                                                            {formData.logo ? formData.logo.name : "Click to upload logo"}
                                                        </p>
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
                                                <Input
                                                    label="Agency Name *"
                                                    placeholder="Enter agency / company name"
                                                    value={formData.agencyName}
                                                    onChange={(e) => updateFormData("agencyName", e.target.value)}
                                                    className="text-xs font-medium placeholder:text-gray-300"
                                                />
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Business Type *</label>
                                                    <div className="relative">
                                                        <select
                                                            value={formData.businessType}
                                                            onChange={(e) => updateFormData("businessType", e.target.value)}
                                                            className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600"
                                                        >
                                                            <option value="">Select business type</option>
                                                            <option>Private Limited</option>
                                                            <option>Proprietorship</option>
                                                            <option>Partnership</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Year Established *</label>
                                                    <div className="relative">
                                                        <select
                                                            value={formData.yearEstablished}
                                                            onChange={(e) => updateFormData("yearEstablished", e.target.value)}
                                                            className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600"
                                                        >
                                                            <option value="">Select year</option>
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
                                                        <select
                                                            value={formData.employeeCount}
                                                            onChange={(e) => updateFormData("employeeCount", e.target.value)}
                                                            className="w-full h-10 bg-white border border-gray-200 rounded-lg px-4 text-xs appearance-none focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600"
                                                        >
                                                            <option value="">Select employees</option>
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
                                                        value={formData.about}
                                                        onChange={(e) => updateFormData("about", e.target.value)}
                                                        placeholder="Write a brief description..."
                                                        className="w-full min-h-[120px] bg-white border border-gray-200 rounded-xl p-4 text-xs font-medium focus:ring-1 focus:ring-[#5B3DF5] outline-none resize-none placeholder:text-gray-300"
                                                    />
                                                    <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-300">
                                                        {formData.about.length} / 500
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Primary Services Offered */}
                                    <div className="space-y-4 pt-4">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">Primary Services Offered *</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Select all that apply</p>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {SERVICES.map((service) => {
                                                const Icon = service.icon;
                                                const isSelected = formData.selectedServices.includes(service.id);
                                                return (
                                                    <button
                                                        key={service.id}
                                                        onClick={() => toggleService(service.id)}
                                                        className={cn(
                                                            "flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-300",
                                                            isSelected
                                                                ? "bg-[#5B3DF5]/5 border-[#5B3DF5] text-[#5B3DF5]"
                                                                : "bg-white border-gray-100 text-slate-500 hover:border-gray-200"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "h-8 w-8 rounded-lg flex items-center justify-center",
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
                                </>
                            )}

                            {activeStep === 2 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Registration Number *"
                                                placeholder="CIN or Reg No"
                                                value={formData.regNo}
                                                onChange={(e) => updateFormData("regNo", e.target.value)}
                                            />
                                            <Input
                                                label="GSTIN Number *"
                                                placeholder="22AAAAA0000A1Z5"
                                                value={formData.gstin}
                                                onChange={(e) => updateFormData("gstin", e.target.value)}
                                            />
                                            <Input
                                                label="PAN Number *"
                                                placeholder="ABCDE1234F"
                                                value={formData.pan}
                                                onChange={(e) => updateFormData("pan", e.target.value)}
                                            />
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Registered Office Address *</label>
                                                <textarea
                                                    value={formData.regAddress}
                                                    onChange={(e) => updateFormData("regAddress", e.target.value)}
                                                    className="w-full h-24 bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600 resize-none"
                                                    placeholder="Full office address with pincode"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeStep === 3 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Authorized Person Name *"
                                                placeholder="Full Name"
                                                value={formData.contactName}
                                                onChange={(e) => updateFormData("contactName", e.target.value)}
                                            />
                                            <Input
                                                label="Designation *"
                                                placeholder="Managing Director / Owner"
                                                value={formData.designation}
                                                onChange={(e) => updateFormData("designation", e.target.value)}
                                            />
                                            <Input
                                                label="Official Email Address *"
                                                type="email"
                                                placeholder="agency@domain.com"
                                                value={formData.email}
                                                onChange={(e) => updateFormData("email", e.target.value)}
                                            />
                                            <Input
                                                label="Mobile Number *"
                                                placeholder="+91 00000 00000"
                                                value={formData.mobile}
                                                onChange={(e) => updateFormData("mobile", e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeStep === 4 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { title: "GST Certificate", desc: "GSTIN Proof", field: "gstCert" },
                                        { title: "PAN Card", desc: "Company/Individual PAN", field: "panCopy" },
                                        { title: "Registration Proof", desc: "COI or Trade License", field: "businessProof" },
                                    ].map((doc, i) => (
                                        <div key={i} className="relative">
                                            <input
                                                type="file"
                                                id={`file-${doc.field}`}
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, doc.field as any)}
                                            />
                                            <Card
                                                onClick={() => document.getElementById(`file-${doc.field}`)?.click()}
                                                className="border-2 border-dashed border-gray-100 hover:border-[#5B3DF5]/30 cursor-pointer transition-all group"
                                            >
                                                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#5B3DF5] transition-colors">
                                                        <Upload className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-800">{doc.title}</h4>
                                                        <p className="text-[10px] text-gray-400 font-medium">
                                                            {(formData as any)[doc.field as any] ? (formData as any)[doc.field as any].name : doc.desc}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeStep === 5 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Account Holder Name *"
                                                placeholder="Full name as in bank"
                                                value={formData.accName}
                                                onChange={(e) => updateFormData("accName", e.target.value)}
                                            />
                                            <Input
                                                label="Bank Name *"
                                                placeholder="HDFC Bank, SBI etc"
                                                value={formData.bankName}
                                                onChange={(e) => updateFormData("bankName", e.target.value)}
                                            />
                                            <Input
                                                label="Account Number *"
                                                placeholder="0000 0000 0000"
                                                value={formData.accNo}
                                                onChange={(e) => updateFormData("accNo", e.target.value)}
                                            />
                                            <Input
                                                label="IFSC Code *"
                                                placeholder="HDFC0001234"
                                                value={formData.ifsc}
                                                onChange={(e) => updateFormData("ifsc", e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeStep === 6 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Operational Cities *"
                                                placeholder="New Delhi, Mumbai, Lucknow"
                                                value={formData.cities}
                                                onChange={(e) => updateFormData("cities", e.target.value)}
                                            />
                                            <Input
                                                label="Operational States *"
                                                placeholder="Delhi, Uttar Pradesh, Maharashtra"
                                                value={formData.states}
                                                onChange={(e) => updateFormData("states", e.target.value)}
                                            />
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                                            <Info className="h-5 w-5 text-blue-500 shrink-0" />
                                            <p className="text-[10px] text-blue-600 font-medium">You can select multiple cities or states where your agency has active inventory.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeStep === 7 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Years of Experience *"
                                                placeholder="e.g. 10"
                                                value={formData.experience}
                                                onChange={(e) => updateFormData("experience", e.target.value)}
                                            />
                                            <Input
                                                label="Portfolio / Website Link"
                                                placeholder="https://agency.com"
                                                value={formData.portfolioUrl}
                                                onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
                                            />
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">Top 3 Clients *</label>
                                                <textarea
                                                    value={formData.topClients}
                                                    onChange={(e) => updateFormData("topClients", e.target.value)}
                                                    className="w-full h-24 bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-[#5B3DF5] outline-none font-medium text-slate-600 resize-none"
                                                    placeholder="List your major clients (separated by comma)"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeStep === 8 && (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-8 space-y-8">
                                        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                                                <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-green-900">Ready to Submit</h4>
                                                <p className="text-xs text-green-700">Please review your information carefully.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b pb-2">Agency Details</h5>
                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-slate-700">{formData.agencyName || "N/A"}</p>
                                                    <p className="text-[11px] text-gray-500 font-medium">{formData.about?.substring(0, 100)}...</p>
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {formData.selectedServices.map(s => (
                                                            <span key={s} className="text-[9px] font-bold bg-[#5B3DF5]/5 text-[#5B3DF5] px-2 py-0.5 rounded-full">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b pb-2">Legal Information</h5>
                                                <div className="space-y-2 text-[11px]">
                                                    <div className="flex justify-between border-b border-gray-50 pb-1">
                                                        <span className="text-gray-400 font-medium">GSTIN:</span>
                                                        <span className="text-slate-700 font-bold">{formData.gstin || "N/A"}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-gray-50 pb-1">
                                                        <span className="text-gray-400 font-medium">PAN:</span>
                                                        <span className="text-slate-700 font-bold">{formData.pan || "N/A"}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-gray-50 pb-1">
                                                        <span className="text-gray-400 font-medium">Contact:</span>
                                                        <span className="text-slate-700 font-bold">{formData.mobile || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Navigation Buttons */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                {errors.length > 0 && (
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                                        <Info className="h-5 w-5 text-red-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-red-800">Please complete the following fields:</p>
                                            <p className="text-[10px] text-red-600 font-medium">{errors.join(", ")}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={activeStep === 1}
                                        className={cn(
                                            "rounded-xl px-8 font-bold flex items-center gap-2 border-gray-200 text-slate-600 transition-all active:scale-[0.98]",
                                            activeStep === 1 && "opacity-0"
                                        )}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Previous
                                    </Button>

                                    <Button
                                        onClick={nextStep}
                                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-xl px-10 py-6 h-auto flex items-center gap-2 group transition-all active:scale-[0.98] shadow-lg shadow-[#5B3DF5]/20"
                                    >
                                        {activeStep === STEPS.length ? "Complete Submission" : "Save & Continue"}
                                        {activeStep < STEPS.length && (
                                            <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                                →
                                            </motion.span>
                                        )}
                                    </Button>
                                </div>
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
