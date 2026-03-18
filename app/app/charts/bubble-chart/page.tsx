"use client";

import React, { useMemo } from "react";
import BubbleChart, { BubbleData } from "@/app/components/charts/BubbleChart";

const EXPANDED_BUBBLE_DATA: BubbleData[] = [
  { x: 80, y: 90, size: 500, category: "Growth", label: "Alpha Stream" },
  { x: 20, y: 30, size: 120, category: "Stable", label: "Legacy Core" },
  { x: 55, y: 70, size: 350, category: "Risk", label: "Project Delta" },
  { x: 40, y: 45, size: 200, category: "New", label: "Beta Labs" },
  { x: 90, y: 20, size: 420, category: "Growth", label: "Omega Ops" },
  { x: 10, y: 85, size: 80, category: "Risk", label: "Edge Case" },
  { x: 65, y: 40, size: 280, category: "Stable", label: "Sustaining P1" },
  { x: 30, y: 60, size: 150, category: "New", label: "Incubator X" },
  { x: 75, y: 55, size: 310, category: "Growth", label: "Zeta Scale" },
  { x: 48, y: 15, size: 190, category: "Stable", label: "Mainframe Z" },
];

export default function BubblesPage() {
  const chartData = useMemo(() => EXPANDED_BUBBLE_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <BubbleChart data={chartData} />
      </div>
    </main>
  );
}
