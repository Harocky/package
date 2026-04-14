"use client";

import StorageTabs from "@/app/components/ui/EvStorageTabs";
import React, { Suspense } from "react";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl flex flex-col items-center ev-gap-lg">
      <header className="w-full max-w-7xl flex flex-col items-center mb-10">
        <StorageTabs />
      </header>

      <main className="w-full max-w-7xl flex justify-center animation-fade-in">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </div>
  );
}
