"use client";

import { usePathname, useRouter } from "next/navigation";
import EvTabs from "./EvTabs";

export default function StorageTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const TABS = [
    { id: "/app/storage/use-state", label: "Use State" },
    { id: "/app/storage/use-context", label: "  Use Context" },
    { id: "/app/storage/use-search-params", label: "URL Search Params" },
    { id: "/app/storage/cookies", label: "Cookies" },
    { id: "/app/storage/local-storage", label: "Local Storage" },
    { id: "/app/storage/session-storage", label: "Session Storage" },
    { id: "/app/storage/indexed-db", label: "IndexedDB" },
    { id: "/app/storage/cache", label: "Cache Storage" },
    { id: "/app/storage/memory-cache", label: "Memory Cache" },
  ];

  return (
    <div className="w-full max-w-7xl">
      <EvTabs
        tabs={TABS}
        activeTab={pathname}
        onChange={(route: string) => router.push(route)}
      />
    </div>
  );
}