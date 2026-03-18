"use client";

import { useMemo } from "react";
import LollipopChart, {
  LollipopData,
} from "@/app/components/charts/LollipopChart";

// HOLDER 1: Static Raw Data (Simulated API)
const RAW_LOLLIPOP_DATA: LollipopData[] = [
  { category: "Node.js", value: 850 },
  { category: "React", value: 920 },
  { category: "Next.js", value: 780 },
  { category: "Python", value: 640 },
  { category: "Go", value: 410 },
  { category: "Rust", value: 320 },
];

export default function RankingsPage() {
  // HOLDER 2: Memoized Data (ready for API hook)
  const chartData = useMemo(() => {
    return RAW_LOLLIPOP_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <LollipopChart data={chartData} />

        <div className="ev-flex ev-flex-wrap ev-gap-md">
          <div
            className="ev-flex-1 ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm"
            style={{ minWidth: "280px" }}
          >
            <p className="ev-text-sm text-slate-500 uppercase font-bold">
              Top Performer
            </p>
            <p className="ev-text-xl font-bold text-indigo-600">React (920)</p>
          </div>
          <div
            className="ev-flex-1 ev-pad-md ev-bg-alt ev-rounded-lg ev-border ev-shadow-sm"
            style={{ minWidth: "280px" }}
          >
            <p className="ev-text-sm text-slate-500 uppercase font-bold">
              Avg. Interest
            </p>
            <p className="ev-text-xl font-bold text-slate-900">653</p>
          </div>
        </div>
      </div>
    </main>
  );
}
