"use client";

import React, { useState, useMemo } from "react";

export type ScatterData = {
  x: number;
  y: number;
  size: number;
  category: string;
  label: string;
};

const CAT_COLORS: Record<string, string> = {
  SaaS: "#6366f1",
  Hardware: "#10b981",
  Services: "#f59e0b",
  Fintech: "#ec4899",
  Other: "#94a3b8",
};

export default function ScatterPlot({ data }: { data: ScatterData[] }) {
  const [activeCats, setActiveCats] = useState<string[]>(
    Array.from(new Set(data.map((d) => d.category))),
  );
  const [useSize, setUseSize] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<
    (ScatterData & { cx: number; cy: number; r: number }) | null
  >(null);

  const width = 800;
  const height = 450;
  const padding = { left: 60, right: 40, top: 60, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const filteredData = useMemo(
    () => data.filter((d) => activeCats.includes(d.category)),
    [data, activeCats],
  );

  const stats = useMemo(() => {
    const allX = data.map((d) => d.x);
    const allY = data.map((d) => d.y);
    return {
      maxX: Math.max(...allX, 1) * 1.1,
      maxY: Math.max(...allY, 1) * 1.1,
      maxSize: Math.max(...data.map((d) => d.size), 1),
    };
  }, [data]);

  const points = useMemo(() => {
    return filteredData.map((d) => ({
      ...d,
      cx: padding.left + (d.x / stats.maxX) * cW,
      cy: height - padding.bottom - (d.y / stats.maxY) * cH,
      r: useSize ? (d.size / stats.maxSize) * 20 + 5 : 8,
    }));
  }, [filteredData, stats, useSize, cW, cH, height, padding]);

  const toggleCat = (cat: string) => {
    setActiveCats((p) =>
      p.includes(cat)
        ? p.length > 1
          ? p.filter((c) => c !== cat)
          : p
        : [...p, cat],
    );
  };

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-5xl">
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-center ev-mar-b-md ev-gap-md">
        <div className="ev-flex ev-flex-wrap ev-gap-xs">
          {Object.keys(CAT_COLORS).map((cat) => {
            const isActive = activeCats.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={`ev-text-xs ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition ev-border cursor-pointer font-bold flex items-center gap-2 ${
                  isActive
                    ? "ev-bg-alt border-slate-200 text-slate-900"
                    : "opacity-40"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: CAT_COLORS[cat] }}
                />
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setUseSize(!useSize)}
          className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition border cursor-pointer font-bold ${useSize ? "ev-bg-primary text-white border-transparent shadow-sm" : "ev-bg-alt text-slate-500"}`}
        >
          {useSize ? "Impact Scaling: On" : "Fixed Radius"}
        </button>
      </div>

      <div className="relative w-full aspect-[16/9]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-full block"
        >
          {/* Grid lines and Ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={padding.top + t * cH}
                y2={padding.top + t * cH}
                stroke="rgba(0,0,0,0.05)"
                strokeDasharray="4"
              />
              <text
                x={padding.left - 12}
                y={height - padding.bottom - t * cH}
                textAnchor="end"
                alignmentBaseline="middle"
                className="ev-text-sm font-medium"
                fill="#94a3b8"
              >
                {Math.round(t * stats.maxY)}
              </text>
              <text
                x={padding.left + t * cW}
                y={height - padding.bottom + 25}
                textAnchor="middle"
                className="ev-text-sm font-medium"
                fill="#94a3b8"
              >
                {Math.round(t * stats.maxX)}
              </text>
            </g>
          ))}

          {/* Data Points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={CAT_COLORS[p.category] || CAT_COLORS.Other}
              fillOpacity={hoveredPoint?.label === p.label ? 1 : 0.6}
              stroke={CAT_COLORS[p.category] || CAT_COLORS.Other}
              strokeWidth={hoveredPoint?.label === p.label ? "3" : "1"}
              className="cursor-pointer ev-transition"
              style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Fixed Tooltip Position: Above the Dot */}
        {hoveredPoint && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none ev-transition"
            style={{
              left: `${(hoveredPoint.cx / width) * 100}%`,
              top: `${(hoveredPoint.cy / height) * 100}%`,
              transform: `translate(-50%, calc(-100% - ${hoveredPoint.r + 10}px))`,
            }}
          >
            <p className="ev-text-sm font-bold text-slate-800 border-b border-slate-200 pb-1 mb-1 whitespace-nowrap">
              {hoveredPoint.label}
            </p>
            <div className="ev-text-xs grid grid-cols-2 gap-x-3 gap-y-1">
              <span className="text-slate-500">Value X:</span>{" "}
              <span className="font-bold text-right">{hoveredPoint.x}</span>
              <span className="text-slate-500">Value Y:</span>{" "}
              <span className="font-bold text-right">{hoveredPoint.y}</span>
              <span className="text-slate-500">Impact:</span>{" "}
              <span className="font-bold text-indigo-600 text-right">
                {hoveredPoint.size}
              </span>
            </div>
            {/* Arrow Pointer */}
            <div className="absolute left-1/2 -bottom-1.5 w-3 h-3 ev-bg-alt border-r border-b border-slate-200 rotate-45 -translate-x-1/2" />
          </div>
        )}
      </div>
    </div>
  );
}
