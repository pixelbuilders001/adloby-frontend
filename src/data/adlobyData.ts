export interface AdCategory {
    id: string;
    title: string;
    iconName: string;
    description: string;
}

export interface AdLocation {
    id: string;
    title: string;
    distance: string;
    price: string;
    image: string;
}

export interface PrintItem {
    id: string;
    title: string;
    iconName: string;
}

export interface TimelineStep {
    step: number;
    title: string;
    iconName: string;
    description: string;
}

export interface TrustFeature {
    id: string;
    title: string;
    description: string;
    iconName: string;
}

export const ADVERTISING_CATEGORIES: AdCategory[] = [
    {
        id: "billboard",
        title: "Billboard (Hoarding)",
        iconName: "MonitorPlay",
        description: "Large outdoor board for displaying advertisements, typically found in high-traffic areas."
    },
    {
        id: "unipole",
        title: "Unipole",
        iconName: "Maximize2",
        description: "An advertising sign-board structure mounted on a single pole for great viewing angles."
    },
    {
        id: "led-screen",
        title: "LED Screen",
        iconName: "Tv",
        description: "Dynamic digital billboards featuring colorful light emitting diode panels."
    },
    {
        id: "wall-painting",
        title: "Wall Painting",
        iconName: "Paintbrush",
        description: "Artistic, large-scale custom hand-painted advert murals on building walls."
    },
    {
        id: "transit-media",
        title: "Transit Media",
        iconName: "Bus",
        description: "Advertisements placed on or inside public transport vehicles and transit stations."
    },
    {
        id: "airport-media",
        title: "Airport Media",
        iconName: "Plane",
        description: "High-impact premium digital and static advertisements inside airport concourses."
    }
];

export const POPULAR_LOCATIONS: AdLocation[] = [
    {
        id: "loc-1",
        title: "Golghar Chowk",
        distance: "1.2 km away",
        price: "₹8,000 / 30 Days",
        image: "/images/location-golghar.jpg"
    },
    {
        id: "loc-2",
        title: "Medical College Road",
        distance: "2.1 km away",
        price: "₹7,500 / 30 Days",
        image: "/images/location-medical.jpg"
    },
    {
        id: "loc-3",
        title: "Railway Station Road",
        distance: "2.8 km away",
        price: "₹6,500 / 30 Days",
        image: "/images/location-station.jpg"
    },
    {
        id: "loc-4",
        title: "Taramandal Chowk",
        distance: "3.2 km away",
        price: "₹7,000 / 30 Days",
        image: "/images/location-taramandal.jpg"
    }
];

export const PRINTING_SOLUTIONS: PrintItem[] = [
    { id: "flex", title: "Flex Banner", iconName: "Image" },
    { id: "visiting", title: "Visiting Card", iconName: "Contact" },
    { id: "pamphlet", title: "Pamphlet", iconName: "FileText" },
    { id: "brochure", title: "Brochure", iconName: "BookOpen" },
    { id: "signboard", title: "Sign Board", iconName: "Heading" },
    { id: "sticker", title: "Sticker", iconName: "Sparkles" },
    { id: "letterhead", title: "Letterhead", iconName: "File" },
    { id: "id-card", title: "ID Card", iconName: "UserSquare2" },
    { id: "menu", title: "Menu Card", iconName: "Utensils" },
    { id: "more", title: "More", iconName: "MoreHorizontal" }
];

export const TIMELINE_STEPS: TimelineStep[] = [
    {
        step: 1,
        title: "Search",
        iconName: "Search",
        description: "Find what you need"
    },
    {
        step: 2,
        title: "Choose & Customize",
        iconName: "Edit3",
        description: "Select template or upload design"
    },
    {
        step: 3,
        title: "Get Best Price",
        iconName: "Tag",
        description: "See final price instantly"
    },
    {
        step: 4,
        title: "Book & Pay",
        iconName: "CreditCard",
        description: "Confirm and make payment"
    }
];

export const TRUST_FEATURES: TrustFeature[] = [
    {
        id: "trust-1",
        title: "Verified Partners",
        description: "Trusted agencies & printers",
        iconName: "CheckCircle"
    },
    {
        id: "trust-2",
        title: "Best Price Promise",
        description: "Get the best market price",
        iconName: "Tag"
    },
    {
        id: "trust-3",
        title: "Secure Payments",
        description: "100% safe & secure",
        iconName: "ShieldAlert"
    },
    {
        id: "trust-4",
        title: "24/7 Support",
        description: "We're here to help you",
        iconName: "Headphones"
    }
];
