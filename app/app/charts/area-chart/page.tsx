"use client";

import React, { useMemo } from "react";
import AreaChart, { DataPoint } from "@/app/components/charts/AreaChart";

// HOLDER 1: Static Raw Data (Simulated API)
const RAW_API_DATA: DataPoint[] = Array.from({ length: 91 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (90 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mobile: Math.floor(Math.random() * 300) + 100,
    desktop: Math.floor(Math.random() * 400) + 200,
    tablet: Math.floor(Math.random() * 150) + 50,
  };
});

export default function TrafficPage() {
  // HOLDER 2: Memoized Data (ready for API hook)
  const chartData = useMemo(() => {
    return RAW_API_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-items-center ev-gap-lg">
        <AreaChart data={chartData} />
        <section className="w-full max-w-5xl ev-flex ev-flex-wrap ev-gap-md ev-justify-center">
          <StatBox title="Mobile" val="4,203" color="text-indigo-600" />
          <StatBox title="Desktop" val="8,102" color="text-emerald-600" />
          <StatBox title="Tablet" val="2,301" color="text-amber-600" />
        </section>
      </div>
    </main>
  );
}

function StatBox({
  title,
  val,
  color,
}: {
  title: string;
  val: string;
  color: string;
}) {
  return (
    <div
      className="ev-flex-1 ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm"
      style={{ minWidth: "280px" }}
    >
      <p className="ev-text-sm text-slate-500 uppercase font-bold">{title}</p>
      <p className={`ev-text-xl font-bold ev-mar-y-xs ${color}`}>{val}</p>
    </div>
  );
}
