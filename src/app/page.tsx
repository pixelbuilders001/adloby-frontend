"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

// Import Custom Nav, Headers and Sections
import { BottomNavbar } from "@/components/navigation/BottomNavbar";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { AdvertisingGrid } from "@/components/advertising/AdvertisingGrid";
import { PopularLocations } from "@/components/locations/PopularLocations";
import { PrintingGrid } from "@/components/printing/PrintingGrid";
import { Timeline } from "@/components/timeline/Timeline";
import { TrustFeatures } from "@/components/shared/TrustFeatures";

import {
  Plus,
  Calendar,
  MessageSquare,
  User,
  CheckCircle,
  FileText,
  TrendingUp,
  MapPin,
  Boxes
} from "lucide-react";

export default function Home() {
  const addToast = useToastStore((state) => state.addToast);

  // App States
  const [currentTab, setCurrentTab] = React.useState<string>("dashboard");
  const [currentLocation, setCurrentLocation] = React.useState<string>("Gorakhpur");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);

  // Mock Bookings State
  const [bookings, setBookings] = React.useState([
    {
      id: "BK-1002",
      type: "advertising",
      service: "Billboard (Hoarding)",
      location: "Golghar Chowk",
      status: "Active",
      date: "07 Jun 2026",
      price: "₹8,005"
    },
    {
      id: "BK-0914",
      type: "printing",
      service: "Flex Banner Print",
      location: "N/A",
      status: "Delivered",
      date: "04 Jun 2026",
      price: "₹2,400"
    }
  ]);

  // Handle Order Form Submission
  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceType = formData.get("serviceType") as string;
    const itemName = formData.get("itemName") as string;
    const locationName = formData.get("locationName") as string;
    const priceRange = serviceType === "Advertising" ? "₹8,500" : "₹1,250";

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      type: serviceType.toLowerCase(),
      service: itemName || (serviceType === "Advertising" ? "Unipole Site" : "Visiting Cards"),
      location: serviceType === "Advertising" ? locationName || "Custom Site" : "N/A",
      status: "Pending",
      date: "Today",
      price: priceRange
    };

    setBookings([newBooking, ...bookings]);
    addToast(`${serviceType} booking order submitted successfully!`, "success");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] text-gray-900 transition-colors duration-250">



      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-64 max-w-xs bg-white h-full shadow-xl z-50 p-5"
            >
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 font-black text-xl text-[#5B3DF5]">
                  <Boxes className="h-6 w-6" />
                  <span>ADLOBY</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:bg-gray-150"
                  aria-label="Close drawer"
                >
                  <span className="font-bold text-lg">✕</span>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 space-y-2 py-4">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Boxes },
                  { id: "advertising", label: "Advertising", icon: TrendingUp },
                  { id: "printing", label: "Printing", icon: FileText },
                  { id: "bookings", label: "Bookings", icon: Calendar },
                  { id: "messages", label: "Messages", icon: MessageSquare },
                  { id: "settings", label: "Settings", icon: User }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${isActive
                        ? "bg-[#5B3DF5]/10 text-[#5B3DF5]"
                        : "text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">

        {/* Unified Responsive Header */}
        <Header
          currentLocation={currentLocation}
          onLocationChange={setCurrentLocation}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
        />

        {/* Workspace Content Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <AnimatePresence mode="wait">

            {/* View 1: DASHBOARD (Home Layout) */}
            {currentTab === "dashboard" && (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Hero Slider banner */}
                <Hero
                  onExploreAds={() => setCurrentTab("advertising")}
                  onExplorePrinting={() => setCurrentTab("printing")}
                />

                {/* Advertising Category grid */}
                <AdvertisingGrid onSelectCategory={() => setCurrentTab("advertising")} />

                {/* Popular Ad Locations list */}
                <PopularLocations />

                {/* Printing Solutions item cards grid */}
                <PrintingGrid onSelectItem={() => setCurrentTab("printing")} />

                {/* How Adloby Works Timeline */}
                <Timeline />

                {/* Core Credibility highlights */}
                <TrustFeatures />
              </motion.div>
            )}

            {/* View 2: ADVERTISING SOLUTIONS VIEW */}
            {currentTab === "advertising" && (
              <motion.div
                key="advertising-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">ADVERTISING SOLUTIONS</h1>
                  <p className="text-sm text-gray-500">Discover and book premium high-impact physical and digital display hoarding networks.</p>
                </div>
                <AdvertisingGrid onSelectCategory={() => { }} />
                <PopularLocations />
              </motion.div>
            )}

            {/* View 3: PRINTING SOLUTIONS VIEW */}
            {currentTab === "printing" && (
              <motion.div
                key="printing-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">PRINTING SOLUTIONS</h1>
                  <p className="text-sm text-gray-500">Order high quality offset press printing products delivered right to your corporate offices.</p>
                </div>
                <PrintingGrid onSelectItem={() => { }} />

                {/* Visual placeholder print info card */}
                <Card className="from-[#16A34A]/5 to-[#16A34A]/10 bg-gradient-to-r border-[#16A34A]/25">
                  <CardHeader>
                    <CardTitle className="text-[#16A34A] flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Eco-Friendly Paper stock options available
                    </CardTitle>
                    <CardDescription>
                      We provide FSC certified recycled visiting cards and biodegradable banners. Check print customizations on booking checkout.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )}

            {/* View 4: BOOKINGS LIST */}
            {currentTab === "bookings" && (
              <motion.div
                key="bookings-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center select-none">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Active Bookings</h1>
                    <p className="text-sm text-gray-500">Manage your active billboard slots and offset printing shipping orders.</p>
                  </div>
                  <Button size="sm" onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 font-semibold bg-[#5B3DF5]">
                    <Plus className="h-4 w-4" /> Book New
                  </Button>
                </div>

                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="hover:-translate-y-0.5 transition-transform duration-200">
                      <CardHeader className="flex flex-row items-start justify-between pb-2 bg-gray-50/50">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${booking.type === "advertising"
                            ? "bg-[#5B3DF5]/10 text-[#5B3DF5]"
                            : "bg-[#16A34A]/10 text-[#16A34A]"
                            }`}>
                            {booking.type}
                          </span>
                          <CardTitle className="text-base font-extrabold mt-1.5">{booking.service}</CardTitle>
                          {booking.location !== "N/A" && (
                            <CardDescription className="flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin className="h-3 w-3 text-[#5B3DF5]" /> {booking.location}
                            </CardDescription>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-gray-400 uppercase leading-none block">Booking Price</span>
                          <span className="text-base font-black text-slate-900 block mt-1">{booking.price}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex justify-between items-center py-4 border-t border-gray-100">
                        <span className="text-xs font-semibold text-gray-500">ID: {booking.id} | Booked: {booking.date}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${booking.status === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                          }`}>
                          {booking.status}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* View 5: MESSAGES MOCK */}
            {currentTab === "messages" && (
              <motion.div
                key="messages-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Partner Chat</h1>
                  <p className="text-sm text-gray-500">Coordinate and upload graphics spec sheets directly with printing and hoarding operators.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 h-[480px] bg-white rounded-3xl border border-gray-150 overflow-hidden">
                  {/* Left contacts list */}
                  <div className="border-r border-gray-150 flex flex-col justify-start">
                    <div className="p-4 border-b border-gray-155">
                      <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#5B3DF5] w-full"
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {[
                        { name: "Gorakhpur Prints Operator", msg: "Can you confirm the flex dimension layout?", active: true, unread: true },
                        { name: "Taramandal Billboard Agency", msg: "Creative approved. We go live tomorrow morning.", active: false, unread: false }
                      ].map((contact, i) => (
                        <div key={i} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-all cursor-pointer ${contact.active && "bg-gray-50/80"}`}>
                          <div className="flex justify-between items-center sm:gap-2">
                            <span className="text-xs font-bold text-gray-900">{contact.name}</span>
                            {contact.unread && <span className="h-2 w-2 rounded-full bg-[#5B3DF5]" />}
                          </div>
                          <p className="text-[10px] text-gray-400 truncate mt-1">{contact.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Chat Arena */}
                  <div className="lg:col-span-2 flex flex-col h-full bg-gray-50/20">
                    <div className="p-4 border-b border-gray-150 bg-white flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-950">Gorakhpur Prints Operator</span>
                        <span className="text-[9px] text-[#16A34A] font-semibold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Online
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      <div className="bg-white border text-xs text-gray-700 max-w-xs p-3 rounded-2xl rounded-tl-none shadow-sm">
                        Hello! We received your design file for the Flex Banner format. Just wanted to double check on the bleed safety margins.
                      </div>
                      <div className="bg-[#5B3DF5] text-white text-xs max-w-xs p-3 rounded-2xl rounded-tr-none ml-auto shadow-sm">
                        Hi! I added a 1-inch border bleed safety setup on the margins. Hope that works file?
                      </div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-150 flex gap-2.5">
                      <input
                        type="text"
                        placeholder="Write dynamic message..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#5B3DF5] outline-none"
                      />
                      <Button className="bg-[#5B3DF5] hover:bg-indigo-700 text-xs px-4 py-2 font-bold text-white rounded-xl">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View 6: SETTINGS VIEW */}
            {currentTab === "settings" && (
              <motion.div
                key="settings-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Marketplace Settings</h1>
                  <p className="text-sm text-gray-500 font-medium">Verify your profile accounts, verified business licenses, and billing setups.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Account overview */}
                  <Card className="col-span-1">
                    <CardHeader className="text-center space-y-4">
                      <div className="mx-auto h-20 w-20 rounded-full bg-[#5B3DF5]/10 text-[#5B3DF5] flex items-center justify-center">
                        <User className="h-10 w-10" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Rajeev Kumar</CardTitle>
                        <CardDescription>Enterprise Client Account</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="border-t border-gray-100 pt-4 text-center">
                      <span className="text-[11px] font-bold text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                        Verified KYC
                      </span>
                    </CardContent>
                  </Card>

                  {/* Action Forms */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Business Demographics</CardTitle>
                      <CardDescription>Customize standard location settings and marketing filters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4 flex-wrap">
                        <Input label="Company Name" defaultValue="Pixel Builders Corp" className="flex-1" readOnly />
                        <Input label="Registred Email" defaultValue="rajeev@pixelbuilders.com" className="flex-1" readOnly />
                      </div>
                      <Input label="Corporate Head Office" defaultValue="Gorakhpur Bypass Highway, Sector 4" readOnly />

                      <div className="pt-2 flex justify-end">
                        <Button className="bg-[#5B3DF5] font-semibold">
                          Update Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* View 7: PROFILE MOCK FOR BOTTOM NAV */}
            {currentTab === "profile" && (
              <motion.div
                key="profile-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">My Profile</h1>
                  <p className="text-sm text-gray-500">View corporate user information.</p>
                </div>

                <Card className="text-center p-6 space-y-4 max-w-sm mx-auto">
                  <div className="mx-auto h-20 w-20 rounded-full bg-[#5B3DF5]/10 text-[#5B3DF5] flex items-center justify-center">
                    <User className="h-10 w-10 opacity-70" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Rajeev Kumar</h2>
                    <p className="text-xs text-gray-400 font-medium">rajeev@pixelbuilders.com</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-around">
                      <div>
                        <span className="font-black text-lg text-slate-800">2</span>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Bookings</p>
                      </div>
                      <div>
                        <span className="font-black text-lg text-slate-800">Gorakhpur</span>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Location</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* Floating Bottom Nav - Mobile Only */}
      <BottomNavbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />

      {/* Create Order Modal / Wizard */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule Marketplace Order"
      >
        <form onSubmit={handleCreateOrder} className="space-y-4 text-left">

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Service Category</label>
            <select
              name="serviceType"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:ring-1 focus:ring-[#5B3DF5] focus:border-[#5B3DF5] outline-none"
            >
              <option>Advertising</option>
              <option>Printing</option>
            </select>
          </div>

          <Input
            name="itemName"
            label="Service Item Customization"
            placeholder="e.g. Visiting Cards or LED Screen"
            required
            className="text-xs"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Target Location (For Advertising)</label>
            <select
              name="locationName"
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:ring-1 focus:ring-[#5B3DF5] focus:border-[#5B3DF5] outline-none"
            >
              <option>Golghar Chowk</option>
              <option>Medical College Road</option>
              <option>Railway Station Road</option>
              <option>Taramandal Chowk</option>
              <option>Lucknow Hwy Junction</option>
            </select>
          </div>

          <div className="pt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 font-semibold text-xs py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 font-semibold text-xs py-2.5 bg-[#5B3DF5] text-white"
            >
              Submit Order
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
