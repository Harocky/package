"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EvProfileDropdown from "./EvProfileDropdown";
import { navPages } from "@/types/nav-pages";

export default function EvNavbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered =
    query.length === 0
      ? []
      : navPages.filter((p) =>
          p.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <nav className="ev-navbar">
      <div className="ev-nav-inner">
        {/* Logo Section */}
        <div className="ev-logo" onClick={() => router.push("/")}>
          EV
        </div>

        {/* Links Section (Hidden on Mobile) */}
        <div className="hidden md:flex ev-gap-lg">
          {navPages.slice(0, 4).map((p) => (
            <button
              key={p.href}
              className="ev-link ev-text-sm ev-font-semibold"
              onClick={() => router.push(p.href)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Search Section */}
        <div className="ev-search-container">
          <input
            className="ev-input"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {filtered.length > 0 && (
            <div className="ev-search-results">
              {filtered.map((p) => (
                <button
                  key={p.href}
                  className="ev-search-item"
                  onClick={() => {
                    router.push(p.href);
                    setQuery("");
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Section */}
        <EvProfileDropdown pages={navPages} />
      </div>
    </nav>
  );
}
