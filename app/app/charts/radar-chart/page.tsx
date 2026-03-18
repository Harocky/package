"use client";

import React, { useMemo } from "react";
import RadarChart, { RadarCategory } from "@/app/components/charts/RadarChart";

const PERFORMANCE_DATA: RadarCategory[] = [
  {
    id: "prod_a",
    label: "Model Alpha",
    color: "#6366f1",
    metrics: [
      { axis: "Speed", value: 85 },
      { axis: "Battery", value: 60 },
      { axis: "Durability", value: 90 },
      { axis: "Display", value: 75 },
      { axis: "Camera", value: 50 },
      { axis: "Value", value: 70 },
    ],
  },
  {
    id: "prod_b",
    label: "Model Bravo",
    color: "#10b981",
    metrics: [
      { axis: "Speed", value: 65 },
      { axis: "Battery", value: 95 },
      { axis: "Durability", value: 70 },
      { axis: "Display", value: 85 },
      { axis: "Camera", value: 90 },
      { axis: "Value", value: 80 },
    ],
  },
  {
    id: "prod_c",
    label: "Model Delta",
    color: "#f59e0b",
    metrics: [
      { axis: "Speed", value: 95 },
      { axis: "Battery", value: 40 },
      { axis: "Durability", value: 80 },
      { axis: "Display", value: 60 },
      { axis: "Camera", value: 70 },
      { axis: "Value", value: 55 },
    ],
  },
];

export default function RadarPage() {
  const chartData = useMemo(() => PERFORMANCE_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-2xl">
        <RadarChart data={chartData} />
      </div>
    </main>
  );
}
