"use client";

import React, { useState, useMemo } from "react";

export type ParetoData = {
  category: string;
  value: number;
};

export default function ParetoChart({ data }: { data: ParetoData[] }) {
  const [isSorted, setIsSorted] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 800;
  const height = 450;
  const padding = { left: 60, right: 60, top: 40, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const processedData = useMemo(() => {
    const list = [...data];
    if (isSorted) {
      list.sort((a, b) => b.value - a.value);
    }

    const total = list.reduce((sum, d) => sum + d.value, 0);
    let runningSum = 0;

    return list.map((d) => {
      runningSum += d.value;
      return {
        ...d,
        cumulativePercent: total > 0 ? (runningSum / total) * 100 : 0,
      };
    });
  }, [data, isSorted]);

  const maxVal = useMemo(
    () => Math.max(...data.map((d) => d.value), 1) * 1.1,
    [data],
  );

  const linePath = useMemo(() => {
    if (processedData.length === 0) return "";
    const sectionSize = cW / processedData.length;

    return processedData
      .map((d, i) => {
        const x = padding.left + i * sectionSize + sectionSize / 2;
        const y = padding.top + cH - (d.cumulativePercent / 100) * cH;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [processedData, cW, cH, padding]);

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-5xl">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-md">
        <div className="ev-flex ev-flex-col">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest">
            Quality Control
          </span>
          <span className="ev-text-lg font-bold">80/20 Rule Analysis</span>
        </div>

        <button
          onClick={() => setIsSorted(!isSorted)}
          className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition border cursor-pointer font-bold ${
            isSorted
              ? "ev-bg-primary text-white border-transparent"
              : "ev-bg-alt text-slate-500"
          }`}
        >
          {isSorted ? "Sorted (Pareto)" : "Unsorted"}
        </button>
      </div>

      <div className="relative w-full aspect-[16/9]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-full block"
        >
          {/* Y-Axis (Frequency) - Left */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={`l-${t}`}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={padding.top + t * cH}
                y2={padding.top + t * cH}
                stroke="rgba(0,0,0,0.05)"
              />
              <text
                x={padding.left - 10}
                y={height - padding.bottom - t * cH}
                textAnchor="end"
                alignmentBaseline="middle"
                className="ev-text-sm"
                fill="#94a3b8"
              >
                {Math.round(t * maxVal)}
              </text>
            </g>
          ))}

          {/* Y-Axis (Percentage) - Right */}
          {[0, 20, 40, 60, 80, 100].map((p) => (
            <text
              key={`r-${p}`}
              x={width - padding.right + 10}
              y={height - padding.bottom - (p / 100) * cH}
              textAnchor="start"
              alignmentBaseline="middle"
              className="ev-text-sm font-bold"
              fill="#6366f1"
            >
              {p}%
            </text>
          ))}

          {/* Bars */}
          {processedData.map((d, i) => {
            const sectionSize = cW / processedData.length;
            const barW = sectionSize * 0.8;
            const barH = (d.value / maxVal) * cH;
            const x = padding.left + i * sectionSize + (sectionSize - barW) / 2;
            const y = height - padding.bottom - barH;

            return (
              <rect
                key={d.category}
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill="#94a3b8"
                fillOpacity={hoveredIdx === i ? 0.8 : 0.4}
                rx={2}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ transition: "all 0.5s ease" }}
              />
            );
          })}

          {/* Cumulative Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "all 0.5s ease" }}
          />

          {/* Dots on the Line */}
          {processedData.map((d, i) => {
            const sectionSize = cW / processedData.length;
            const x = padding.left + i * sectionSize + sectionSize / 2;
            const y = padding.top + cH - (d.cumulativePercent / 100) * cH;
            return (
              <circle
                key={`c-${i}`}
                cx={x}
                cy={y}
                r={hoveredIdx === i ? 6 : 4}
                fill="#6366f1"
                stroke="white"
                strokeWidth="2"
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}

          {/* X-Axis Labels */}
          {processedData.map((d, i) => {
            const sectionSize = cW / processedData.length;
            const x = padding.left + i * sectionSize + sectionSize / 2;
            return (
              <text
                key={`x-${i}`}
                x={x}
                y={height - padding.bottom + 25}
                textAnchor="middle"
                className="ev-text-sm font-bold"
                fill="#64748b"
              >
                {d.category}
              </text>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none"
            style={{
              left: `${((padding.left + hoveredIdx * (cW / processedData.length) + cW / processedData.length / 2) / width) * 100}%`,
              top: `20%`,
              transform: "translateX(-50%)",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-800 border-b pb-1 mb-1">
              {processedData[hoveredIdx].category}
            </p>
            <p className="ev-text-xs">
              Count:{" "}
              <span className="font-bold">
                {processedData[hoveredIdx].value}
              </span>
            </p>
            <p className="ev-text-xs text-indigo-600">
              Cumulative:{" "}
              <span className="font-bold">
                {processedData[hoveredIdx].cumulativePercent.toFixed(1)}%
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
