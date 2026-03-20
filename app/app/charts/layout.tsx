import ChartsTabs from "@/app/components/ui/EvChartsTabs";
import React from "react";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl flex flex-col items-center">
      <header className="w-full max-w-7xl ev-flex ev-flex-col ev-items-center ev-mar-b-xl">
        <ChartsTabs />
      </header>

      <main className="w-full max-w-7xl ev-flex ev-justify-center animation-fade-in">
        {children}
      </main>

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
