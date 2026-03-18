"use client";

import React, { useMemo } from "react";
import FunnelChart, { FunnelStage } from "@/app/components/charts/FunnelChart";

const PYRAMID_DATA: FunnelStage[] = [
  { stage: "Strategic Leadership", value: 12 },
  { stage: "Senior Management", value: 45 },
  { stage: "Department Leads", value: 120 },
  { stage: "Operational Staff", value: 850 },
  { stage: "External Contractors", value: 2400 },
];

export default function FunnelPage() {
  const chartData = useMemo(() => PYRAMID_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl">
        <FunnelChart data={chartData} />
      </div>
    </main>
  );
}
