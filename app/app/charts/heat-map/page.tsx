"use client";

import Heatmap from "@/app/components/charts/HeatMap";

const generateData = () => {
  const data = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (const day of days) {
    for (let h = 0; h < 24; h++) {
      let val = 0;
      // High activity during afternoon and evening sessions
      if (h >= 12 && h <= 16) val = Math.floor(Math.random() * 50) + 10;
      if (h >= 18 && h <= 21) val = Math.floor(Math.random() * 60) + 20;
      data.push({ x: day, y: h, value: val });
    }
  }
  return data;
};

export default function ActivityPage() {
  return (
    <main className="min-h-screen ev-bg-main flex justify-center items-center p-10">
      <Heatmap data={generateData()} />
    </main>
  );
}
