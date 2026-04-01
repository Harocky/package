"use client";

import EvDynamicBreadcrumbs from "@/app/components/ui/EvDynamicBreadcrumbs";
import EvSidebar from "@/app/components/ui/EvSidebar";
import { useState } from "react";

const menu = [
  { name: "Accordion", icon: "🗂️", href: "/app/accordion" },
  { name: "Breadcrumbs", icon: "🧭", href: "/app/breadcrumbs" },
  { name: "Buttons", icon: "🔘", href: "/app/button" },
  { name: "Charts", icon: "📊", href: "/app/charts" },
  { name: "CheckBox", icon: "☑️", href: "/app/checkbox" },
  { name: "Datepicker", icon: "📅", href: "/app/datepicker" },
  { name: "Dropdown", icon: "🔽", href: "/app/dropdown" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="pt-[70px] flex min-h-screen">
      <EvSidebar
        menu={menu}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 bg-[var(--ev-bg)] ev-pad-lg flex flex-col ev-gap-md">
        <EvDynamicBreadcrumbs />

        {children}
      </main>
    </div>
  );
}
