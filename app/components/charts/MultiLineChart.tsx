"use client";

import React, { useState, useMemo } from "react";

export type DataPoint = {
  date: string;
  sales: number;
  users: number;
  profit: number;
};

type Metric = keyof Omit<DataPoint, "date">;
type Range = "7d" | "30d" | "90d";

const METRIC_CONFIG: Record<Metric, { stroke: string; label: string }> = {
  sales: { stroke: "#6366f1", label: "Sales" },
  users: { stroke: "#10b981", label: "Users" },
  profit: { stroke: "#f59e0b", label: "Profit" },
};

interface ChartProps {
  data: DataPoint[];
}

export default function MultiLineChart({ data }: ChartProps) {
  const [activeMetrics, setActiveMetrics] = useState<Metric[]>([
    "sales",
    "users",
    "profit",
  ]);
  const [range, setRange] = useState<Range>("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 1. Filter Logic
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const counts = { "7d": 7, "30d": 30, "90d": 90 };
    return data.slice(-counts[range]);
  }, [data, range]);

  // Dimensions
  const width = 800;
  const height = 400;
  const paddingLeft = 70;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  if (filteredData.length === 0)
    return <div className="ev-pad-md">No data available...</div>;

  // 2. Scaling Logic
  const maxValue =
    Math.ceil(
      (Math.max(
        ...filteredData.flatMap((d) => activeMetrics.map((m) => d[m])),
        1,
      ) *
        1.1) /
        10,
    ) * 10;

  const yLabels = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    value: Math.round(maxValue * t),
    y: height - paddingBottom - t * chartHeight,
  }));

  const lines = activeMetrics.map((metric) => {
    const points = filteredData.map((d, i) => ({
      x: (i / (filteredData.length - 1)) * chartWidth + paddingLeft,
      y: height - paddingBottom - (d[metric] / maxValue) * chartHeight,
      value: d[metric],
    }));
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    return { metric, points, linePath };
  });

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

  const toggleMetric = (m: Metric) => {
    setActiveMetrics((prev) =>
      prev.includes(m) ? prev.filter((i) => i !== m) : [...prev, m],
    );
  };

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full">
      {/* Legend / Toggle Section */}
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-center ev-mar-y-md ev-gap-md">
        <div className="ev-flex ev-gap-sm">
          {(Object.keys(METRIC_CONFIG) as Metric[]).map((m) => (
            <label
              key={m}
              className="ev-flex ev-items-center ev-gap-xs ev-cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={activeMetrics.includes(m)}
                onChange={() => toggleMetric(m)}
                className="hidden"
              />
              <div
                className="w-4 h-4 ev-rounded-sm ev-border ev-transition"
                style={{
                  borderColor: METRIC_CONFIG[m].stroke,
                  backgroundColor: activeMetrics.includes(m)
                    ? METRIC_CONFIG[m].stroke
                    : "#ffffff",
                }}
              >
                {activeMetrics.includes(m) && (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-white">
                    ✓
                  </div>
                )}
              </div>
              <span
                className={`ev-text-sm ${activeMetrics.includes(m) ? "font-bold text-slate-900" : "text-slate-400"}`}
              >
                {METRIC_CONFIG[m].label}
              </span>
            </label>
          ))}
        </div>

        <div className="ev-flex ev-bg-alt ev-pad-xs ev-rounded-md ev-gap-xs">
          {(["7d", "30d", "90d"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-sm cursor-pointer ${range === r ? "ev-bg-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
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
          {/* Grid & Axes */}
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
                {tick.value.toLocaleString()}
              </text>
            </React.Fragment>
          ))}
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

          {/* Lines */}
          {lines.map(({ metric, linePath }) => (
            <path
              key={metric}
              d={linePath}
              fill="none"
              stroke={METRIC_CONFIG[metric as Metric].stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "all 0.6s ease" }}
            />
          ))}

          {/* Interaction */}
          {lines[0]?.points.map((p, i) => (
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
                  {lines.map(({ metric, points }) => (
                    <circle
                      key={metric}
                      cx={points[i].x}
                      cy={points[i].y}
                      r={5}
                      fill={METRIC_CONFIG[metric as Metric].stroke}
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
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

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-rounded-md ev-shadow-popover ev-pad-sm ev-border pointer-events-none"
            style={{
              left: `${(lines[0].points[hoveredIndex].x / width) * 100}%`,
              top: `5%`,
              transform: "translateX(-50%)",
            }}
          >
            <p className="ev-text-sm text-slate-500 font-bold">
              {filteredData[hoveredIndex].date}
            </p>
            {activeMetrics.map((m) => (
              <div key={m} className="ev-flex ev-justify-between ev-gap-md">
                <span
                  className="ev-text-sm capitalize"
                  style={{ color: METRIC_CONFIG[m].stroke }}
                >
                  {m}:
                </span>
                <span className="ev-text-sm font-bold">
                  {filteredData[hoveredIndex][m].toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
