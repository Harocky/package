"use client";

import { useMemo } from "react";
import MultiLineChart, {
  DataPoint,
} from "@/app/components/charts/MultiLineChart";

// HOLDER 1: Static Raw Data (Simulated API Response)
const RAW_API_DATA: DataPoint[] = Array.from({ length: 91 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (90 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sales: Math.floor(Math.random() * 500) + 200,
    users: Math.floor(Math.random() * 100) + 50,
    profit: Math.floor(Math.random() * 800) + 100,
  };
});

export default function ChartPage() {
  // HOLDER 2: Memoized Data (Ready for API hook)
  const chartData = useMemo(() => {
    // Later: return apiResponse.data
    return RAW_API_DATA;
  }, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full ev-flex ev-flex-col ev-items-center ev-gap-lg">
        <section className="w-full max-w-5xl">
          <MultiLineChart data={chartData} />
        </section>

        <section className="w-full max-w-5xl ev-flex ev-flex-wrap ev-gap-md ev-justify-center">
          <StatBox title="Net Sales" val="12.4k" color="text-indigo-600" />
          <StatBox title="Active Users" val="8.2k" color="text-emerald-600" />
          <StatBox title="Total Profit" val="$4.5k" color="text-amber-600" />
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
      style={{ minWidth: "260px" }}
    >
      <p className="ev-text-sm text-slate-500 uppercase font-bold">{title}</p>
      <p className={`ev-text-xl font-bold ev-mar-y-xs ${color}`}>{val}</p>
    </div>
  );
}
