"use client";

import React, { useMemo } from "react";
import BoxPlot, { BoxData } from "@/app/components/charts/BoxPlot";

const EXTENDED_BOX_DATA: BoxData[] = [
  { category: "React", min: 120, q1: 250, median: 410, q3: 580, max: 890 },
  { category: "Next.js", min: 180, q1: 310, median: 490, q3: 620, max: 940 },
  { category: "Node.js", min: 90, q1: 210, median: 380, q3: 540, max: 760 },
  { category: "Tailwind", min: 150, q1: 280, median: 450, q3: 600, max: 820 },
  { category: "TypeScript", min: 200, q1: 350, median: 520, q3: 710, max: 980 },
  { category: "Prisma", min: 60, q1: 150, median: 290, q3: 420, max: 610 },
  { category: "Zustand", min: 40, q1: 110, median: 230, q3: 380, max: 550 },
];

export default function AnalyticsPage() {
  const chartData = useMemo(() => EXTENDED_BOX_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <BoxPlot data={chartData} />
      </div>
    </main>
  );
}
