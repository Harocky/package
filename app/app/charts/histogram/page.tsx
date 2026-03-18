"use client";

import React, { useMemo } from "react";
import Histogram from "@/app/components/charts/Histogram";

const RAW_SCORES = [
  -15, -10, -5, 0, 2, 5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45,
  50, 52, 55, 58, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 120,
];

export default function HistogramPage() {
  // HOLDER 2: Memoized Data
  const chartData = useMemo(() => RAW_SCORES, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <Histogram data={chartData} />
      </div>
    </main>
  );
}
