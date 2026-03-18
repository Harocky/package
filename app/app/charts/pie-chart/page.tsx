"use client";

import React, { useMemo } from "react";
import PieChart, { PieData } from "@/app/components/charts/PieChart";

// HOLDER 1: Static Raw Data (ready for API hook integration)
const RAW_BUDGET_DATA: PieData[] = [
  { category: "Engineering", percentage: 40 },
  { category: "Marketing", percentage: 25 },
  { category: "Sales", percentage: 15 },
  { category: "Operations", percentage: 10 },
  { category: "R&D", percentage: 10 },
];

export default function AllocationPage() {
  // HOLDER 2: Chart Data ready for the component
  const chartData = useMemo(() => {
    return RAW_BUDGET_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-2xl ev-flex ev-flex-col">
        <PieChart data={chartData} />
      </div>
    </main>
  );
}
