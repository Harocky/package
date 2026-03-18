"use client";

import React, { useMemo } from "react";
import BarChart, { BarData } from "@/app/components/charts/BarChart";

// HOLDER 1: Static Raw Data (Simulated API Response)
const RAW_BAR_DATA: BarData[] = [
  { category: "Jan", q1: 450, q2: 300, q3: 200 },
  { category: "Feb", q1: 320, q2: 500, q3: 150 },
  { category: "Mar", q1: 200, q2: 400, q3: 600 },
  { category: "Apr", q1: 550, q2: 200, q3: 300 },
];

export default function SalesPage() {
  // HOLDER 2: Memoized Data (ready for API hook)
  const chartData = useMemo(() => {
    return RAW_BAR_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <BarChart data={chartData} />
      </div>
    </main>
  );
}
