"use client";

import { useState } from "react";
import EvSidebar from "../components/ui/EvSidebar";
import EvDynamicBreadcrumbs from "../components/ui/EvDynamicBreadcrumbs";

const menu = [
  { name: "Accordion", icon: "🗂️", href: "/app/accordion" },
  { name: "Breadcrumbs", icon: "🧭", href: "/app/breadcrumbs" },
  { name: "Buttons", icon: "🔘", href: "/app/button" },
  { name: "Charts", icon: "📊", href: "/app/charts" },
  { name: "CheckBox", icon: "☑️", href: "/app/checkbox" },
  { name: "Datepicker", icon: "📅", href: "/app/datepicker" },
  { name: "Dropdown", icon: "🔽", href: "/app/dropdown" },
  { name: "Expandable Card", icon: "📖", href: "/app/expandable-card" },
  { name: "Feature Card", icon: "⭐", href: "/app/feature-card" },
  { name: "Flex Card", icon: "🧩", href: "/app/flex-card" },
  { name: "Label Input", icon: "🏷️", href: "/app/label-input" },
  { name: "Confirm Popup", icon: "✔️", href: "/app/popup-confirm" },
  { name: "Large Popup", icon: "🪟", href: "/app/popup-large" },
  { name: "Roadmap", icon: "🗺️", href: "/app/roadmap" },
  { name: "Submit Button", icon: "🚀", href: "/app/submit-button" },
  { name: "Table", icon: "🔖", href: "/app/table" },
  { name: "Tags", icon: "🔖", href: "/app/tags" },
  { name: "Testimonials", icon: "💬", href: "/app/testimonials" },
  { name: "Toast", icon: "💬", href: "/app/toast" },
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
