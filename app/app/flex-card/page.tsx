"use client";

import EvFlexCards, { EvFlexCardData } from "@/app/components/ui/EvFlexCards";

const CARD_DATA: EvFlexCardData[] = [
  {
    id: "1",
    title: "Solar Integration",
    subtitle: "Harness the power of the sun for your daily commute.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M5 5l1.5 1.5"></path>
        <path d="M17.5 17.5L19 19"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M5 19l1.5-1.5"></path>
        <path d="M17.5 6.5L19 5"></path>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Smart Grid",
    subtitle: "AI-optimized energy distribution across the network.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
  },
  {
    id: "3",
    title: "Fast Charging",
    subtitle: "80% battery capacity in under 15 minutes.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    id: "4",
    title: "Battery Tech",
    subtitle: "Next-generation solid-state cell architecture.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
        <line x1="22" y1="11" x2="22" y2="13"></line>
      </svg>
    ),
  },
  {
    id: "5",
    title: "Fleet Management",
    subtitle: "Enterprise solutions for commercial electric vehicles.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
];

export default function Page() {
  return (
    <main className="min-h-screen ev-bg-main ev-pad-xl ev-flex ev-justify-center ev-items-center">
      <EvFlexCards data={CARD_DATA} />
    </main>
  );
}
