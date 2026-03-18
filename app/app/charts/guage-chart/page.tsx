"use client";

import GaugeChart from "@/app/components/charts/GaugeChart";

const METRICS = [
  {
    label: "Processor Usage",
    value: 74,
    min: 0,
    max: 100,
    unit: "%",
    color: "#6366f1",
  },
  {
    label: "Memory Pressure",
    value: 58,
    min: 0,
    max: 100,
    unit: "%",
    color: "#10b981",
  },
  {
    label: "Network Throughput",
    value: 850,
    min: 0,
    max: 1000,
    unit: "Mbps",
    color: "#f59e0b",
  },
  {
    label: "Thermal State",
    value: 42,
    min: 0,
    max: 100,
    unit: "°C",
    color: "#ec4899",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl ev-flex ev-justify-center ev-items-center">
      <GaugeChart metrics={METRICS} />
    </div>
  );
}
