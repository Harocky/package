"use client";

import React, { useState, useMemo } from "react";

export type FunnelStage = {
  stage: string;
  value: number;
};

export default function FunnelChart({ data }: { data: FunnelStage[] }) {
  const [activeStages, setActiveStages] = useState<string[]>(
    data.map((d) => d.stage),
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Fixed internal coordinate system
  const width = 1000;
  const height = 600;

  // Increased horizontal padding to prevent label overflow
  const padding = { top: 60, bottom: 40, left: 220, right: 220 };

  const filteredData = useMemo(
    () => data.filter((d) => activeStages.includes(d.stage)),
    [data, activeStages],
  );

  const shapes = useMemo(() => {
    const totalStages = filteredData.length;
    const chartH = height - padding.top - padding.bottom;
    const stageH = chartH / totalStages;

    // Geometry: Upright Triangle
    const topX = width / 2;
    const topY = padding.top;
    const baseLeftX = padding.left;
    const baseRightX = width - padding.right;
    const baseY = height - padding.bottom;

    return filteredData.map((d, i) => {
      const y0 = padding.top + i * stageH;
      const y1 = padding.top + (i + 1) * stageH;

      const getX = (currY: number) => {
        const t = (currY - topY) / (baseY - topY);
        const leftX = topX + t * (baseLeftX - topX);
        const rightX = topX + t * (baseRightX - topX);
        return { leftX, rightX };
      };

      const topCoords = getX(y0);
      const botCoords = getX(y1);

      const points = `
        ${topCoords.leftX},${y0} 
        ${topCoords.rightX},${y0} 
        ${botCoords.rightX},${y1} 
        ${botCoords.leftX},${y1}
      `.trim();

      return {
        ...d,
        points,
        midY: (y0 + y1) / 2,
      };
    });
  }, [
    filteredData,
    height,
    width,
    padding.left,
    padding.right,
    padding.top,
    padding.bottom,
  ]);

  const toggleStage = (stage: string) => {
    setActiveStages((prev) =>
      prev.includes(stage)
        ? prev.length > 1
          ? prev.filter((s) => s !== stage)
          : prev
        : [...prev, stage],
    );
  };

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-6xl overflow-hidden">
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-center ev-mar-b-lg ev-gap-md">
        <div>
          <h3 className="ev-text-lg font-bold">Organization Hierarchy</h3>
          <p className="ev-text-sm text-slate-500 font-medium">
            Safe-zone rendering with label truncation.
          </p>
        </div>
        <div className="ev-flex ev-flex-wrap ev-gap-xs justify-end max-w-md">
          {data.map((d) => (
            <button
              key={d.stage}
              onClick={() => toggleStage(d.stage)}
              className={`ev-text-xs ev-pad-xs ev-rounded-md ev-transition ev-border font-bold cursor-pointer ${
                activeStages.includes(d.stage)
                  ? "ev-bg-alt border-slate-300 shadow-sm"
                  : "opacity-30"
              }`}
            >
              {d.stage}
            </button>
          ))}
        </div>
      </div>

      {/* aspect-ratio prevents vertical overflow in flex layouts */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50/50 ev-rounded-xl border border-slate-100">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full block overflow-visible"
        >
          {shapes.map((s, i) => (
            <g
              key={s.stage}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer group"
            >
              <polygon
                points={s.points}
                fill="#6366f1"
                fillOpacity={hoveredIdx === i ? 1 : 0.9 - i * 0.12}
                stroke="white"
                strokeWidth="2"
                style={{ transition: "all 0.4s ease-out" }}
              />

              {/* Left Label: Truncated for safety, uses padding as boundary */}
              <text
                x={padding.left - 30}
                y={s.midY}
                textAnchor="end"
                alignmentBaseline="middle"
                className="ev-text-xs font-bold uppercase tracking-tight"
                fill="#64748b"
                style={{ fontSize: "11px" }}
              >
                {s.stage.length > 20
                  ? s.stage.substring(0, 17) + "..."
                  : s.stage}
              </text>

              {/* Value Label: Centered */}
              <text
                x={width / 2}
                y={s.midY}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="ev-text-sm font-bold pointer-events-none"
                fill={i === 0 ? "#4338ca" : "white"}
              >
                {s.value.toLocaleString()}
              </text>
            </g>
          ))}
        </svg>

        {hoveredIdx !== null && shapes[hoveredIdx] && (
          <div
            className="absolute z-10 bg-slate-900 ev-pad-sm ev-rounded-lg ev-shadow-xl text-white border border-slate-700 pointer-events-none"
            style={{
              top: `${(shapes[hoveredIdx].midY / height) * 100}%`,
              left: "50%",
              transform: "translate(-50%, -140%)",
            }}
          >
            <p className="ev-text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
              {shapes[hoveredIdx].stage}
            </p>
            <p className="ev-text-lg font-bold leading-none">
              {shapes[hoveredIdx].value.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
