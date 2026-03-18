"use client";

import EvRoadmap, { RoadmapStep } from "@/app/components/ui/EvRoadmap";

export default function RoadmapPage() {
  const steps: RoadmapStep[] = [
    {
      title: "Free Site Assessment",
      desc: "We cover end-to-end site planning and branding to get your charging locations deployment-ready.",
      icon: <span className="ev-text-2xl">🎨</span>,
    },
    {
      title: "Execution Plan & Pricing",
      desc: "From hardware recommendations & pricing, to a full installation plan, we've got you covered.",
      icon: <span className="ev-text-2xl">📋</span>,
    },
    {
      title: "Charger Installation & Testing",
      desc: "Our certified technicians install the charger(s) and test them for safety and compliance.",
      icon: <span className="ev-text-2xl">🚧</span>,
    },
    {
      title: "Onboarding & Activation",
      desc: "We complete your KYC, onboard you to Bolt.Earth, and activate your chargers.",
      icon: <span className="ev-text-2xl">📱</span>,
    },
    {
      title: "Service & Maintenance",
      desc: "We provide regular on-site health checks, software updates, and fix issues proactively.",
      icon: <span className="ev-text-2xl">🛠️</span>,
    },
    {
      title: "24/7 Customer support",
      desc: "Our support team is available 24/7 to assist with technical queries or user concerns.",
      icon: <span className="ev-text-2xl">🎧</span>,
    },
  ];

  return (
    <main className="min-h-screen ev-bg-white">
        <EvRoadmap steps={steps} />
    </main>
  );
}
