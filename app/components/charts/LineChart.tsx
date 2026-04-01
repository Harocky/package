"use client";

import React, { useState, useMemo } from "react";

export type DataPoint = {
  date: string;
  availability: number;
};

type Range = "7d" | "30d" | "90d";

interface ChartProps {
  data: DataPoint[];
}

export default function LineChart({ data }: ChartProps) {
  const [range, setRange] = useState<Range>("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // HOLDER 2: Filtered Data based on Range selection
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const counts = { "7d": 7, "30d": 30, "90d": 90 };
    return data.slice(-counts[range]);
  }, [data, range]);

  // Dimensions & Spacing
  const width = 800;
  const height = 400;
  const paddingLeft = 70;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  if (filteredData.length === 0)
    return <div className="ev-pad-md">Loading...</div>;

  // Max Value (Availability is usually %, so we cap at 100 or higher if needed)
  const maxValue = 100;

  const yLabels = [0, 25, 50, 75, 100].map((val) => ({
    value: val,
    y: height - paddingBottom - (val / maxValue) * chartHeight,
  }));

  const points = filteredData.map((d, i) => ({
    x: (i / (filteredData.length - 1)) * chartWidth + paddingLeft,
    y: height - paddingBottom - (d.availability / maxValue) * chartHeight,
    value: d.availability,
    date: d.date,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const xLabels = (() => {
    const interval = range === "90d" ? 14 : range === "30d" ? 5 : 1;
    return filteredData
      .map((d, i) =>
        i % interval === 0 || i === filteredData.length - 1
          ? {
              label: d.date,
              x: (i / (filteredData.length - 1)) * chartWidth + paddingLeft,
            }
          : null,
      )
      .filter(Boolean);
  })();

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full h-full">
      {/* Filters Header */}
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-y-md">
        <h3 className="ev-text-md font-bold text-slate-700 uppercase tracking-tight">
          System Availability (%)
        </h3>
        <div className="ev-flex ev-bg-alt ev-pad-xs ev-rounded-md ev-gap-xs">
          {(["7d", "30d", "90d"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-sm ev-transition cursor-pointer ${range === r ? "ev-bg-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-auto"
        >
          {/* Y Axis Grid */}
          {yLabels.map((tick, i) => (
            <React.Fragment key={i}>
              <line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={tick.y}
                y2={tick.y}
                stroke="rgba(0,0,0,0.05)"
              />
              <text
                x={paddingLeft - 15}
                y={tick.y}
                textAnchor="end"
                alignmentBaseline="middle"
                className="ev-text-sm"
                style={{ fill: "#94a3b8" }}
              >
                {tick.value}%
              </text>
            </React.Fragment>
          ))}

          {/* X Axis Labels */}
          {xLabels.map((item, idx) => (
            <text
              key={idx}
              x={item!.x}
              y={height - 10}
              textAnchor="middle"
              className="ev-text-sm"
              style={{ fill: "#94a3b8" }}
            >
              {item!.label}
            </text>
          ))}

          {/* The Availability Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "all 0.6s ease-in-out" }}
          />

          {/* Interaction Area */}
          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === i && (
                <>
                  <line
                    x1={p.x}
                    x2={p.x}
                    y1={paddingTop}
                    y2={height - paddingBottom}
                    stroke="#cbd5e1"
                    strokeDasharray="4"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={6}
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="2"
                  />
                </>
              )}
              <rect
                x={p.x - 20}
                y={paddingTop}
                width={40}
                height={chartHeight}
                fill="transparent"
                className="ev-cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {/* Fluid Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-rounded-md ev-shadow-popover ev-pad-sm ev-border pointer-events-none"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `10%`,
              transform: "translateX(-50%)",
            }}
          >
            <p className="ev-text-sm text-slate-500 font-bold">
              {points[hoveredIndex].date}
            </p>
            <p className="ev-text-md font-bold text-emerald-600">
              Uptime: {points[hoveredIndex].value}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
