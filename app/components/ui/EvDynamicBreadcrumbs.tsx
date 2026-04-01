"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EvDynamicBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const IGNORE_SEGMENTS = ["app", "api", "admin"];

  const segments = pathname
    .split("/")
    .filter((s) => s && !IGNORE_SEGMENTS.includes(s));

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, label };
  });

  return (
    <div className="flex items-center ev-gap-sm ev-pad-xs">
      <Link href="/" className="ev-link">
        Home
      </Link>

      {crumbs.map((item, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <div key={item.href} className="flex items-center ev-gap-sm">
            <span>/</span>

            {!isLast ? (
              <Link href={item.href} className="ev-link">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
