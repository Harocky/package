"use client";

import { useState } from "react";
import EvSidebar from "../components/ui/EvSidebar";
import EvDynamicBreadcrumbs from "../components/ui/EvDynamicBreadcrumbs";

const menu = [
  { name: "Datepicker", icon: "📅", href: "/app/datepicker" },
  { name: "Dropdown", icon: "⏷", href: "/app/dropdown" },
  { name: "Confirm Popup", icon: "✅", href: "/app/popup-confirm" },
  { name: "Large Popup", icon: "🪟", href: "/app/popup-large" },
  { name: "Submit Button", icon: "🚀", href: "/app/submit-button" },
  { name: "Button", icon: "🔘", href: "/app/button" },
  { name: "Tags", icon: "🏷️", href: "/app/tags" },
  { name: "Label Input", icon: "🏷️", href: "/app/label-input" },
  { name: "CheckBox", icon: "☑️", href: "/app/checkbox" },
  { name: "Accordion", icon: "📂", href: "/app/accordion" },
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
