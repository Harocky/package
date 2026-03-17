"use client";

import { useRouter } from "next/navigation";
import EvStaticBreadcrumbs from "../../components/ui/EvStaticBreadcrumbs";

export default function Page() {
  const router = useRouter();

  const items = [
    { label: "Home", href: "/" },
    { label: "App", href: "/app" },
    { label: "Tags", href: "/app/tags" },
  ];

  function navigate(href: string) {
    router.push(href);
  }

  return (
    <main className="ev-bg-soft ev-pad-2xl min-h-screen ev-flex ev-flex-col ev-items-center ev-justify-center">
      <div className="ev-bg-main ev-pad-md ev-rounded-xl ev-shadow-sm ev-border w-full">
        <EvStaticBreadcrumbs items={items} onNavigate={navigate} />
      </div>
    </main>
  );
}
