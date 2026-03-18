"use client";

import LineChart, { DataPoint } from "@/app/components/charts/LineChart";
import { useMemo } from "react";

// HOLDER 1: Static Raw Data (Ready to be replaced by API call)
const RAW_AVAILABILITY_DATA: DataPoint[] = Array.from(
  { length: 91 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (90 - i));
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      // Random uptime between 98.5% and 100%
      availability: parseFloat(
        (Math.random() * (100 - 98.5) + 98.5).toFixed(2),
      ),
    };
  },
);

export default function AvailabilityPage() {
  // HOLDER 2: Chart Data ready for the component
  const chartData = useMemo(() => {
    return RAW_AVAILABILITY_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full ev-flex ev-flex-col ev-items-center ev-gap-lg">
        <section className="w-full max-w-5xl">
          <LineChart data={chartData} />
        </section>

        <section className="w-full max-w-5xl ev-flex ev-flex-wrap ev-gap-md ev-justify-center">
          <div
            className="ev-flex-1 ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm"
            style={{ minWidth: "280px" }}
          >
            <p className="ev-text-sm text-slate-500 font-bold uppercase">
              Current Uptime
            </p>
            <p className="ev-text-xl font-bold text-emerald-600 ev-mar-y-xs">
              99.98%
            </p>
            <span className="ev-text-sm text-slate-400">Past 24 hours</span>
          </div>

          <div
            className="ev-flex-1 ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm"
            style={{ minWidth: "280px" }}
          >
            <p className="ev-text-sm text-slate-500 font-bold uppercase">
              Incidents
            </p>
            <p className="ev-text-xl font-bold text-slate-900 ev-mar-y-xs">0</p>
            <span className="ev-text-sm text-emerald-600">
              All systems operational
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
