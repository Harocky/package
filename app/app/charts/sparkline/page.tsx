"use client";

import React, { useMemo } from "react";
import Sparkline, { SparkPoint } from "@/app/components/charts/Sparkline";

const RAW_SPARK_DATA: SparkPoint[] = [
  { date: "1", sales: 120, users: 80 },
  { date: "2", sales: 150, users: 95 },
  { date: "3", sales: 110, users: 70 },
  { date: "4", sales: 180, users: 110 },
  { date: "5", sales: 160, users: 105 },
  { date: "6", sales: 210, users: 130 },
  { date: "7", sales: 195, users: 120 },
];

export default function DashboardPage() {
  const sparkData = useMemo(() => RAW_SPARK_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-xl ev-flex ev-flex-col ev-gap-md">
        <h2 className="ev-text-lg font-bold text-slate-800 uppercase tracking-tight">
          Real-time Pulse
        </h2>

        <div className="ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm ev-flex ev-justify-between ev-items-center">
          <div className="ev-flex ev-flex-col">
            <span className="ev-text-sm text-slate-400 font-bold uppercase">
              Growth Trend
            </span>
            <span className="ev-text-xl font-bold text-slate-900">
              +18.4%
            </span>
          </div>

          <Sparkline data={sparkData} metric="sales" />
        </div>
      </div>
    </main>
  );
}