"use client";

import { usePathname, useRouter } from "next/navigation";
import EvTabs from "./EvTabs";

export default function PageAnimationTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const TABS = [
    {
      id: "/app/page-animations/bottom-circular-rotating-image",
      label: "Bottom Circular Rotating Image",
    },
    {
      id: "/app/page-animations/left-right-circular-rotating-image",
      label: "Left Right Circular Rotating Image",
    },
    {
      id: "/app/page-animations/linear-swipping-card",
      label: "Linear Swipping Card",
    },
  ];

  return (
    <div className="w-full max-w-fit">
      <EvTabs
        tabs={TABS}
        activeTab={pathname}
        onChange={(route) => router.push(route)}
      />
    </div>
  );
}
