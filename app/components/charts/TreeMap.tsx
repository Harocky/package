"use client";

import React, { useState, useMemo } from "react";
import EvDropdown from "@/app/components/ui/EvDropdown";

export type TreeItem = {
  id: string;
  label: string;
  value: number;
  colorValue: number;
  children?: TreeItem[];
};

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  item: TreeItem;
}

export default function TreeMap({ data }: { data: TreeItem[] }) {
  const [activeIds, setActiveIds] = useState<string[]>(data.map((d) => d.id));
  const [depth, setDepth] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const width = 800;
  const height = 500;

  const depthOptions = [
    { label: "Level 1: Overview", value: "1" },
    { label: "Level 2: Detailed", value: "2" },
  ];

  const getColor = (val: number) => {
    const intensity = Math.min(Math.max(val, 0), 100);
    return `rgba(99, 102, 241, ${0.15 + (intensity / 100) * 0.85})`;
  };

  const toggleCategory = (id: string) => {
    setActiveIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((i) => i !== id)
          : prev
        : [...prev, id],
    );
  };

  const layout = useMemo(() => {
    const items: Rect[] = [];
    const filteredSource = data.filter((d) => activeIds.includes(d.id));

    const partition = (
      dataItems: TreeItem[],
      x: number,
      y: number,
      w: number,
      h: number,
      currentDepth: number,
    ) => {
      if (
        currentDepth > depth ||
        !dataItems ||
        dataItems.length === 0 ||
        w < 1 ||
        h < 1
      )
        return;

      const total = dataItems.reduce((sum, item) => sum + item.value, 0);
      let offset = 0;

      dataItems.forEach((item) => {
        const ratio = item.value / total;
        let rx, ry, rw, rh;

        if (w > h) {
          rw = w * ratio;
          rh = h;
          rx = x + offset;
          ry = y;
          offset += rw;
        } else {
          rw = w;
          rh = h * ratio;
          rx = x;
          ry = y + offset;
          offset += rh;
        }

        if (currentDepth === depth || !item.children) {
          items.push({ x: rx, y: ry, w: rw, h: rh, item });
        } else {
          partition(item.children, rx, ry, rw, rh, currentDepth + 1);
        }
      });
    };

    partition(filteredSource, 0, 0, width, height, 1);
    return items;
  }, [data, activeIds, depth]);

  const hoveredRect = useMemo(
    () => layout.find((r) => r.item.id === hoveredId),
    [layout, hoveredId],
  );

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-5xl overflow-hidden">
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-end ev-mar-b-md ev-gap-md">
        <div className="ev-flex-1 min-w-[300px]">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest block ev-mar-b-xs">
            Toggle Categories
          </span>
          <div className="ev-flex ev-flex-wrap ev-gap-xs">
            {data.map((d) => {
              const isActive = activeIds.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => toggleCategory(d.id)}
                  className={`ev-text-xs ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition ev-border cursor-pointer font-bold flex items-center gap-2 ${
                    isActive
                      ? "ev-bg-primary text-white border-transparent shadow-sm"
                      : "ev-bg-alt text-slate-500 border-slate-200 opacity-60"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-slate-300"}`}
                  />
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-[180px]">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest block ev-mar-b-xs">
            View Depth
          </span>
          <EvDropdown
            open={isDropdownOpen}
            options={depthOptions}
            selected={depth.toString()}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onClose={() => setIsDropdownOpen(false)}
            onSelect={(val) => setDepth(Number(val))}
          />
        </div>
      </div>

      <div className="relative w-full aspect-[8/5] overflow-hidden ev-rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
        >
          {layout.map((rect) => (
            <g
              key={rect.item.id}
              onMouseEnter={() => setHoveredId(rect.item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <defs>
                <clipPath id={`clip-${rect.item.id}`}>
                  <rect
                    x={rect.x}
                    y={rect.y}
                    width={Math.max(rect.w - 1, 0)}
                    height={Math.max(rect.h - 1, 0)}
                    rx={4}
                  />
                </clipPath>
              </defs>
              <rect
                x={rect.x}
                y={rect.y}
                width={Math.max(rect.w - 1, 0)}
                height={Math.max(rect.h - 1, 0)}
                fill={getColor(rect.item.colorValue)}
                stroke="white"
                strokeWidth={hoveredId === rect.item.id ? "3" : "1"}
                rx={4}
                style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
              {rect.w > 50 && rect.h > 20 && (
                <text
                  x={rect.x + rect.w / 2}
                  y={rect.y + rect.h / 2}
                  clipPath={`url(#clip-${rect.item.id})`}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  dy=".3em"
                  className="ev-text-sm font-bold pointer-events-none select-none"
                  style={{
                    fill: rect.item.colorValue > 60 ? "white" : "#1e293b",
                    fontSize: rect.w < 80 ? "10px" : "12px",
                  }}
                >
                  {rect.w < 90
                    ? rect.item.label.substring(0, 6) + ".."
                    : rect.item.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        {hoveredRect && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none ev-transition"
            style={{
              left: `${(hoveredRect.x / width) * 100}%`,
              top: `${(hoveredRect.y / height) * 100}%`,
              transform:
                hoveredRect.x > width * 0.6
                  ? "translate(-110%, 10px)"
                  : "translate(15px, 15px)",
              minWidth: "160px",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-800 border-b border-slate-100 ev-mar-b-xs pb-1">
              {hoveredRect.item.label}
            </p>
            <div className="ev-flex ev-justify-between">
              <span className="ev-text-xs text-slate-500">Value:</span>
              <span className="ev-text-xs font-bold">
                {hoveredRect.item.value.toLocaleString()}
              </span>
            </div>
            <div className="ev-flex ev-justify-between">
              <span className="ev-text-xs text-slate-500">Heat Index:</span>
              <span className="ev-text-xs font-bold text-indigo-600">
                {hoveredRect.item.colorValue}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
