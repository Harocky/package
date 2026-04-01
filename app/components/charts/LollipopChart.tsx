"use client";

import React, { useState, useMemo } from "react";
import EvDropdown from "@/app/components/ui/EvDropdown";

export type LollipopData = {
  category: string;
  value: number;
};

type SortOrder = "none" | "asc" | "desc";

export default function LollipopChart({ data }: { data: LollipopData[] }) {
  const [sort, setSort] = useState<SortOrder>("none");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const width = 800;
  const height = 450;
  const padding = { left: 80, right: 40, top: 60, bottom: 80 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const sortOptions = [
    { label: "Default Order", value: "none" },
    { label: "Value: Low to High", value: "asc" },
    { label: "Value: High to Low", value: "desc" },
  ];

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const sorted = [...data];
    if (sort === "asc") sorted.sort((a, b) => a.value - b.value);
    if (sort === "desc") sorted.sort((a, b) => b.value - a.value);
    return sorted;
  }, [data, sort]);

  const maxValue = useMemo(() => {
    const max = Math.max(...processedData.map((d) => d.value), 1);
    return Math.ceil((max * 1.1) / 10) * 10;
  }, [processedData]);

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  const points = useMemo(() => {
    const sectionSize = cW / processedData.length;
    return processedData.map((d, i) => ({
      x: padding.left + i * sectionSize + sectionSize / 2,
      y: height - padding.bottom - (d.value / maxValue) * cH,
      val: d.value,
      category: d.category,
    }));
  }, [processedData, maxValue, cW, cH, height, padding]);

  if (!data.length)
    return <div className="ev-pad-md">No data available...</div>;

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full h-full">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-y-md">
        <div className="ev-flex ev-flex-col">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest">
            Rankings
          </span>
          <span className="ev-text-lg font-bold">Category Distribution</span>
        </div>
        <div className="w-[200px]">
          <EvDropdown
            open={isDropdownOpen}
            options={sortOptions}
            selected={sort}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onClose={() => setIsDropdownOpen(false)}
            onSelect={(val) => setSort(val as SortOrder)}
          />
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-auto"
        >
          <text
            x={padding.left / 2}
            y={height / 2}
            transform={`rotate(-90, ${padding.left / 4}, ${height / 2})`}
            textAnchor="middle"
            className="ev-text-sm font-bold"
            style={{ fill: "#64748b" }}
          >
            Value Units
          </text>
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="ev-text-sm font-bold"
            style={{ fill: "#64748b" }}
          >
            Categories
          </text>

          {yTicks.map((t) => {
            const val = Math.round(t * maxValue);
            const pos = padding.top + (1 - t) * cH;
            return (
              <g key={t}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={pos}
                  y2={pos}
                  stroke="rgba(0,0,0,0.05)"
                />
                <text
                  x={padding.left - 15}
                  y={pos}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="ev-text-sm"
                  style={{ fill: "#94a3b8" }}
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              <line
                x1={p.x}
                x2={p.x}
                y1={height - padding.bottom}
                y2={p.y}
                stroke="#6366f1"
                strokeWidth="2"
                style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === i ? 8 : 6}
                fill="#6366f1"
                stroke="white"
                strokeWidth="2"
                style={{ transition: "all 0.3s ease" }}
              />
              <text
                x={p.x}
                y={height - padding.bottom + 25}
                textAnchor="middle"
                className="ev-text-sm font-bold"
                style={{ fill: "#64748b", transition: "all 0.5s ease" }}
              >
                {p.category}
              </text>
              <rect
                x={p.x - 20}
                y={padding.top}
                width={40}
                height={cH}
                fill="transparent"
              />
            </g>
          ))}
        </svg>

        {hoveredIndex !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-500 uppercase">
              {points[hoveredIndex].category}
            </p>
            <p className="ev-text-md font-bold text-indigo-600">
              {points[hoveredIndex].val.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
