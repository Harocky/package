"use client";

import { useState, useMemo } from "react";

export type SparkPoint = {
  date: string;
  sales: number;
  users: number;
};

type Metric = keyof Omit<SparkPoint, "date">;

const SPARK_COLORS: Record<Metric, string> = {
  sales: "#6366f1",
  users: "#10b981",
};

export default function Sparkline({
  data,
  metric,
}: {
  data: SparkPoint[];
  metric: Metric;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 140;
  const height = 40;
  const padding = 4;

  const points = useMemo(() => {
    if (!data || data.length === 0) return [];

    const maxValue = Math.max(...data.map((d) => d[metric]), 1);
    const minValue = Math.min(...data.map((d) => d[metric]));
    const range = maxValue - minValue || 1;

    return data.map((d, i) => ({
      x: (i / (data.length - 1)) * (width - padding * 2) + padding,
      y:
        height -
        padding -
        ((d[metric] - minValue) / range) * (height - padding * 2),
      val: d[metric],
    }));
  }, [data, metric]);

  const linePath = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  }, [points]);

  if (!data || data.length === 0) return null;

  return (
    <div className="ev-flex ev-items-center ev-gap-md">
      <div className="relative group">
        <svg width={width} height={height} className="overflow-visible">
          <path
            d={linePath}
            fill="none"
            stroke={SPARK_COLORS[metric]}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ev-transition"
            style={{ transition: "all 0.4s ease" }}
          />

          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === i && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={3.5}
                  fill={SPARK_COLORS[metric]}
                  stroke="white"
                  strokeWidth="1.5"
                />
              )}
              <rect
                x={p.x - 5}
                y={0}
                width={10}
                height={height}
                fill="transparent"
                className="ev-cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {hoveredIndex !== null && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 ev-bg-alt ev-pad-xs ev-rounded-sm ev-border ev-shadow-sm ev-text-sm font-bold pointer-events-none">
            {points[hoveredIndex].val}
          </div>
        )}
      </div>
    </div>
  );
}
