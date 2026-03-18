"use client";

import React, { useMemo } from "react";
import ParetoChart, { ParetoData } from "@/app/components/charts/ParetoChart";

const DEFECT_DATA: ParetoData[] = [
  { category: "Code Bug", value: 140 },
  { category: "UX Flow", value: 85 },
  { category: "Late Task", value: 35 },
  { category: "Missing Doc", value: 20 },
  { category: "API Delay", value: 15 },
  { category: "Typos", value: 5 },
];

export default function QualityPage() {
  const chartData = useMemo(() => DEFECT_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <ParetoChart data={chartData} />
      </div>
    </main>
  );
}
