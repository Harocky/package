"use client";

import React, { useState, useMemo } from "react";

export type BubbleData = {
  x: number;
  y: number;
  size: number;
  label: string;
  category: string;
};

const BUBBLE_COLORS: Record<string, string> = {
  Growth: "#6366f1",
  Stable: "#10b981",
  Risk: "#f59e0b",
  New: "#ec4899",
};

export default function BubbleChart({ data }: { data: BubbleData[] }) {
  const [scaleSize, setScaleSize] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<
    (BubbleData & { cx: number; cy: number; r: number }) | null
  >(null);

  const width = 800;
  const height = 450;
  const padding = { left: 60, right: 40, top: 60, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const stats = useMemo(() => {
    const allX = data.map((d) => d.x);
    const allY = data.map((d) => d.y);
    const allSize = data.map((d) => d.size);
    return {
      maxX: Math.max(...allX, 1) * 1.1,
      maxY: Math.max(...allY, 1) * 1.1,
      maxSize: Math.max(...allSize, 1),
    };
  }, [data]);

  const points = useMemo(() => {
    return data.map((d) => ({
      ...d,
      cx: padding.left + (d.x / stats.maxX) * cW,
      cy: height - padding.bottom - (d.y / stats.maxY) * cH,
      r: scaleSize ? (d.size / stats.maxSize) * 28 + 4 : 8,
    }));
  }, [data, stats, scaleSize, cW, cH, height, padding]);

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-5xl">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-md">
        <div className="ev-flex ev-flex-col">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest">
            Market Analysis
          </span>
          <span className="ev-text-lg font-bold">Volume vs. Performance</span>
        </div>

        <button
          onClick={() => setScaleSize(!scaleSize)}
          className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition border cursor-pointer font-bold ${
            scaleSize
              ? "ev-bg-primary text-white border-transparent shadow-sm"
              : "ev-bg-alt text-slate-500"
          }`}
        >
          {scaleSize ? "Size: Weighted" : "Size: Uniform"}
        </button>
      </div>

      <div className="relative w-full aspect-[16/9]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-full block"
        >
          {/* Axis & Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={padding.top + t * cH}
                y2={padding.top + t * cH}
                stroke="rgba(0,0,0,0.05)"
              />
              <text
                x={padding.left - 12}
                y={height - padding.bottom - t * cH}
                textAnchor="end"
                alignmentBaseline="middle"
                className="ev-text-sm"
                fill="#94a3b8"
              >
                {Math.round(t * stats.maxY)}
              </text>
              <text
                x={padding.left + t * cW}
                y={height - padding.bottom + 25}
                textAnchor="middle"
                className="ev-text-sm"
                fill="#94a3b8"
              >
                {Math.round(t * stats.maxX)}
              </text>
            </g>
          ))}

          {/* Bubbles */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={BUBBLE_COLORS[p.category] || "#94a3b8"}
              fillOpacity={hoveredPoint?.label === p.label ? 0.9 : 0.5}
              stroke={BUBBLE_COLORS[p.category] || "#94a3b8"}
              strokeWidth={hoveredPoint?.label === p.label ? "3" : "1"}
              className="cursor-pointer"
              style={{
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Tooltip - Positioned above bubble */}
        {hoveredPoint && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none"
            style={{
              left: `${(hoveredPoint.cx / width) * 100}%`,
              top: `${(hoveredPoint.cy / height) * 100}%`,
              transform: `translate(-50%, calc(-100% - ${hoveredPoint.r + 12}px))`,
            }}
          >
            <p className="ev-text-sm font-bold text-slate-800 border-b border-slate-200 pb-1 mb-1 whitespace-nowrap">
              {hoveredPoint.label}
            </p>
            <div className="ev-text-xs grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-slate-500">Value X:</span>{" "}
              <span className="font-bold text-right">{hoveredPoint.x}</span>
              <span className="text-slate-500">Value Y:</span>{" "}
              <span className="font-bold text-right">{hoveredPoint.y}</span>
              <span className="text-slate-500">Size:</span>{" "}
              <span className="font-bold text-indigo-600 text-right">
                {hoveredPoint.size}
              </span>
            </div>
            <div className="absolute left-1/2 -bottom-1.5 w-3 h-3 ev-bg-alt border-r border-b border-slate-200 rotate-45 -translate-x-1/2" />
          </div>
        )}
      </div>
    </div>
  );
}
