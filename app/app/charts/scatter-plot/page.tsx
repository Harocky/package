"use client";

import React, { useMemo } from "react";
import ScatterPlot, { ScatterData } from "@/app/components/charts/ScatterPlot";

const RAW_SCATTER_DATA: ScatterData[] = [
  { x: 85, y: 95, size: 250, category: "SaaS", label: "Enterprise CRM" },
  { x: 15, y: 25, size: 45, category: "Hardware", label: "IoT Sensor A" },
  { x: 65, y: 40, size: 130, category: "Fintech", label: "Payment Gateway" },
  { x: 40, y: 55, size: 90, category: "Services", label: "Cloud Consulting" },
  { x: 92, y: 88, size: 180, category: "SaaS", label: "Analytics Pro" },
  { x: 25, y: 65, size: 110, category: "Hardware", label: "Edge Router" },
  { x: 50, y: 30, size: 70, category: "Fintech", label: "Micro-Lending" },
  { x: 10, y: 90, size: 55, category: "Other", label: "Legacy Tool" },
  { x: 78, y: 22, size: 140, category: "Services", label: "Legal Tech" },
  { x: 33, y: 44, size: 65, category: "SaaS", label: "Team Chat" },
  { x: 58, y: 72, size: 160, category: "Fintech", label: "Crypto Wallet" },
  { x: 45, y: 15, size: 30, category: "Hardware", label: "Smart Switch" },
  { x: 22, y: 38, size: 85, category: "Other", label: "Internal Utils" },
  { x: 89, y: 50, size: 210, category: "SaaS", label: "DevOps Suite" },
  { x: 12, y: 12, size: 20, category: "Services", label: "BPO Basic" },
  { x: 70, y: 82, size: 175, category: "Fintech", label: "Stock API" },
  { x: 60, y: 60, size: 100, category: "Hardware", label: "NAS Storage" },
  { x: 38, y: 92, size: 120, category: "SaaS", label: "Auth Service" },
  { x: 5, y: 50, size: 40, category: "Other", label: "Legacy DB" },
  { x: 82, y: 10, size: 95, category: "Services", label: "Audit Pro" },
];

export default function CorrelationPage() {
  const chartData = useMemo(() => RAW_SCATTER_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <ScatterPlot data={chartData} />
      </div>
    </main>
  );
}
