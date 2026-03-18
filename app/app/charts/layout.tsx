import ChartsTabs from "@/app/components/ui/EvChartsTabs";
import React from "react";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl flex flex-col items-center">
      {/* Persistent Header */}
      <header className="w-full max-w-7xl ev-flex ev-flex-col ev-items-center ev-mar-b-xl ev-gap-md">
        <div className="text-center">
          <h1 className="ev-text-3xl ev-font-black text-gray-900 tracking-tight uppercase">
            Analytics Command Center
          </h1>
          <p className="ev-text-md text-gray-500 ev-font-medium ev-mar-t-xs">
            Multi-dimensional data visualization suite.
          </p>
        </div>

        {/* Persistent Tab Navigation */}
        <ChartsTabs />
      </header>

      {/* Dynamic Page Content (The Charts) */}
      <main className="w-full max-w-7xl ev-flex ev-justify-center animation-fade-in">
        {children}
      </main>

      {/* FIXED: Standard React Style Injection (No TypeScript errors) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .animation-fade-in {
            animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `,
        }}
      />
    </div>
  );
}
