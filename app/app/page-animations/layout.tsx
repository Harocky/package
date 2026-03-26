"use client";

import PageAnimationTabs from "@/app/components/ui/EvAnimationsTab";
import React from "react";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl flex flex-col items-center ev-gap-lg">
      <header className="w-full flex flex-col items-center mb-10">
        <PageAnimationTabs />
      </header>

      <main className="w-full flex justify-center animation-fade-in">
        {children}
      </main>
    </div>
  );
}
