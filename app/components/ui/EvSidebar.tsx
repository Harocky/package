"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type MenuItem = { name: string; icon: string; href: string };

export default function EvSidebar({
  menu,
  collapsed,
  setCollapsed,
}: {
  menu: MenuItem[];
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(true);
  }, [pathname, setCollapsed]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        !collapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setCollapsed(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapsed, setCollapsed]);

  return (
    <aside
      ref={sidebarRef}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={`ev-sidebar ${collapsed ? "is-collapsed" : "is-expanded"}`}
    >
      <div className="ev-pad-sm">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ev-sidebar-item w-full"
        >
          <span className="ev-sidebar-icon">☰</span>
          {!collapsed && <span className="ev-sidebar-label">Menu</span>}
        </button>
      </div>

      <nav className="flex flex-col ev-gap-xs ev-pad-sm overflow-y-auto flex-1">
        {menu.map((m) => {
          const isActive = pathname === m.href;
          return (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setCollapsed(true)}
              className={`ev-sidebar-item ${isActive ? "is-active" : ""}`}
            >
              <span className="ev-sidebar-icon">{m.icon}</span>

              <span
                className={`ev-sidebar-label ${
                  collapsed
                    ? "opacity-0 translate-x-[-10px]"
                    : "opacity-100 translate-x-0"
                }`}
              >
                {m.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
