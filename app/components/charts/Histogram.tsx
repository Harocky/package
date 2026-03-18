"use client";

import React, { useState, useMemo } from "react";
import EvDropdown from "@/app/components/ui/EvDropdown";

export type HistogramData = number;

export default function Histogram({ data }: { data: HistogramData[] }) {
  const [binSize, setBinSize] = useState<number>(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredBin, setHoveredBin] = useState<number | null>(null);

  const width = 800;
  const height = 450;
  const padding = { left: 80, right: 40, top: 40, bottom: 80 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const binOptions = [
    { label: "Bin Size: 5", value: "5" },
    { label: "Bin Size: 10", value: "10" },
    { label: "Bin Size: 20", value: "20" },
    { label: "Bin Size: 50", value: "50" },
  ];

  // 1. Binning Logic (Handles Negative Values)
  const bins = useMemo(() => {
    if (!data.length) return [];
    const min = Math.floor(Math.min(...data) / binSize) * binSize;
    const max = Math.ceil(Math.max(...data) / binSize) * binSize;

    const binCount = Math.max((max - min) / binSize, 1);
    const result = Array.from({ length: binCount }, (_, i) => ({
      x0: min + i * binSize,
      x1: min + (i + 1) * binSize,
      count: 0,
    }));

    data.forEach((val) => {
      const index = Math.min(Math.floor((val - min) / binSize), binCount - 1);
      if (index >= 0) result[index].count++;
    });

    return result;
  }, [data, binSize]);

  const maxCount = useMemo(
    () => Math.max(...bins.map((b) => b.count), 1),
    [bins],
  );

  // 2. Render Logic
  const barData = useMemo(() => {
    return bins.map((b, i) => {
      const barW = cW / bins.length;
      const barH = (b.count / maxCount) * cH;
      return {
        x: padding.left + i * barW,
        y: height - padding.bottom - barH,
        w: barW - 2, // 2px gap between bins
        h: barH,
        ...b,
      };
    });
  }, [bins, maxCount, cW, cH, height, padding]);

  if (!data.length)
    return <div className="ev-pad-md">No numeric data found.</div>;

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-y-md">
        <div className="ev-flex ev-flex-col">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest">
            Distribution
          </span>
          <span className="ev-text-lg font-bold">Frequency Histogram</span>
        </div>
        <div className="w-[180px]">
          <EvDropdown
            open={isDropdownOpen}
            options={binOptions}
            selected={binSize.toString()}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onClose={() => setIsDropdownOpen(false)}
            onSelect={(val) => setBinSize(Number(val))}
          />
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-auto"
        >
          {/* Y-Axis Name */}
          <text
            x={25}
            y={height / 2}
            transform={`rotate(-90, 25, ${height / 2})`}
            textAnchor="middle"
            className="ev-text-sm font-bold"
            style={{ fill: "#64748b" }}
          >
            Frequency (Count)
          </text>

          {/* X-Axis Name */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="ev-text-sm font-bold"
            style={{ fill: "#64748b" }}
          >
            Value Range
          </text>

          {/* Y-Axis Ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const val = Math.round(t * maxCount);
            const yPos = height - padding.bottom - t * cH;
            return (
              <g key={t}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={yPos}
                  y2={yPos}
                  stroke="rgba(0,0,0,0.05)"
                />
                <text
                  x={padding.left - 15}
                  y={yPos}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="ev-text-sm"
                  style={{ fill: "#94a3b8" }}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {barData.map((b, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredBin(i)}
              onMouseLeave={() => setHoveredBin(null)}
            >
              <rect
                x={b.x}
                y={b.y}
                width={Math.max(b.w, 0)}
                height={Math.max(b.h, 0)}
                fill="#6366f1"
                rx={2}
                style={{
                  transition: "all 0.5s ease",
                  opacity: hoveredBin === i ? 1 : 0.8,
                }}
              />
              {/* X-Axis Labels (Dynamic) */}
              {(i % Math.ceil(bins.length / 8) === 0 ||
                i === bins.length - 1) && (
                <text
                  x={b.x + b.w / 2}
                  y={height - padding.bottom + 25}
                  textAnchor="middle"
                  className="ev-text-sm font-bold"
                  style={{ fill: "#64748b" }}
                >
                  {b.x0}
                </text>
              )}
            </g>
          ))}
        </svg>

        {hoveredBin !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none"
            style={{
              left: `${((barData[hoveredBin].x + barData[hoveredBin].w / 2) / width) * 100}%`,
              top: `${(barData[hoveredBin].y / height) * 100}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-500 uppercase">
              Range: {barData[hoveredBin].x0} to {barData[hoveredBin].x1}
            </p>
            <p className="ev-text-md font-bold text-indigo-600">
              Count: {barData[hoveredBin].count}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
