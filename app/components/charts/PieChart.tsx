"use client";

import React, { useState, useMemo } from "react";

export type PieData = {
  category: string;
  percentage: number;
};

const PIE_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
];

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const radians = (angle: number) => (angle - 90) * (Math.PI / 180.0);

  const start = {
    x: x + radius * Math.cos(radians(endAngle)),
    y: y + radius * Math.sin(radians(endAngle)),
  };
  const end = {
    x: x + radius * Math.cos(radians(startAngle)),
    y: y + radius * Math.sin(radians(startAngle)),
  };

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

export default function PieChart({ data }: { data: PieData[] }) {
  const [isDonut, setIsDonut] = useState(false);
  const [activeCats, setActiveCats] = useState<string[]>(
    data.map((d) => d.category),
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = 200;

  const processedData = useMemo(() => {
    const visibleData = data
      .map((d, originalIndex) => ({ ...d, originalIndex }))
      .filter((d) => activeCats.includes(d.category));

    const totalInput = visibleData.reduce((sum, d) => sum + d.percentage, 0);

    return visibleData.map((d) => ({
      ...d,
      scaledPercentage: totalInput > 0 ? (d.percentage / totalInput) * 100 : 0,
    }));
  }, [data, activeCats]);

  const slices = useMemo(() => {
    return processedData.map((d, i) => {
      const previousTotal = processedData
        .slice(0, i)
        .reduce((sum, prev) => sum + prev.scaledPercentage, 0);

      const startAngle = (previousTotal / 100) * 360;
      const sliceAngle = (d.scaledPercentage / 100) * 360;
      const endAngle = startAngle + sliceAngle;

      const radius = hoveredIndex === i ? baseRadius * 1.08 : baseRadius;

      return {
        ...d,
        path: describeArc(centerX, centerY, radius, startAngle, endAngle),
        middleAngle: startAngle + sliceAngle / 2,
        radius,
      };
    });
  }, [processedData, hoveredIndex, centerX, centerY, baseRadius]);

  const toggleCategory = (cat: string) => {
    setActiveCats((prev) =>
      prev.includes(cat)
        ? prev.length > 1
          ? prev.filter((c) => c !== cat)
          : prev
        : [...prev, cat],
    );
  };

  if (!data.length) return <div className="ev-pad-md">No data...</div>;

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-2xl">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-md">
        <h3 className="ev-text-lg font-bold">Market Share</h3>
        <button
          onClick={() => setIsDonut(!isDonut)}
          className="ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-bg-alt ev-border ev-transition hover:ev-shadow-sm font-bold cursor-pointer"
        >
          {isDonut ? "Show Pie" : "Show Donut"}
        </button>
      </div>

      <div className="relative ev-flex ev-items-center ev-gap-lg">
        <div className="flex-1 aspect-square relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible w-full h-auto"
          >
            {slices.map((slice, i) => {
              const sliceColor =
                PIE_COLORS[slice.originalIndex % PIE_COLORS.length];

              if (slice.scaledPercentage >= 99.99) {
                return (
                  <circle
                    key={slice.category}
                    cx={centerX}
                    cy={centerY}
                    r={slice.radius}
                    fill={sliceColor}
                    className="cursor-pointer ev-transition"
                    style={{ transition: "all 0.3s ease-out" }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              }

              return (
                <path
                  key={slice.category}
                  d={slice.path}
                  fill={sliceColor}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer ev-transition"
                  style={{ transition: "all 0.3s ease-out" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}

            {isDonut && (
              <circle
                cx={centerX}
                cy={centerY}
                r={baseRadius * 0.6}
                fill="white"
              />
            )}
          </svg>

          {hoveredIndex !== null && slices[hoveredIndex] && (
            <div
              className="absolute z-10 ev-bg-alt ev-pad-xs ev-rounded-md ev-shadow-popover ev-border pointer-events-none text-center ev-transition"
              style={{
                left: `${50 + ((slices[hoveredIndex].radius * 0.7) / width) * 100 * Math.cos(((slices[hoveredIndex].middleAngle - 90) * Math.PI) / 180)}%`,
                top: `${50 + ((slices[hoveredIndex].radius * 0.7) / height) * 100 * Math.sin(((slices[hoveredIndex].middleAngle - 90) * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <p className="ev-text-sm font-bold">
                {slices[hoveredIndex].category}
              </p>
              <p className="ev-text-md font-bold text-indigo-600">
                {slices[hoveredIndex].percentage.toFixed(1)}%
              </p>
            </div>
          )}
        </div>

        <div className="w-[160px] ev-flex ev-flex-col ev-gap-xs">
          <span className="ev-text-sm font-bold uppercase tracking-widest ev-mar-b-xs">
            Legend
          </span>
          {data.map((d, i) => {
            const isVisible = activeCats.includes(d.category);
            return (
              <button
                key={d.category}
                onClick={() => toggleCategory(d.category)}
                className={`ev-flex ev-items-center ev-gap-xs ev-pad-xs ev-pad-y-xs ev-rounded-md ev-transition text-left cursor-pointer ${
                  isVisible ? "ev-bg-alt" : "opacity-40"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span
                  className={`ev-text-sm truncate ${isVisible ? "font-bold" : ""}`}
                >
                  {d.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
