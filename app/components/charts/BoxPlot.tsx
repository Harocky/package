"use client";

import React, { useState, useMemo } from "react";

export type BoxData = {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

interface BoxMetrics {
  x: number;
  yMin: number;
  yQ1: number;
  yMedian: number;
  yQ3: number;
  yMax: number;
  boxW: number;
  data: BoxData;
}

export default function BoxPlot({ data }: { data: BoxData[] }) {
  // Always show all by default, allowing toggling via buttons
  const [activeCats, setActiveCats] = useState<string[]>(
    data.map((d) => d.category),
  );
  const [hoveredBox, setHoveredBox] = useState<BoxMetrics | null>(null);

  const width = 800;
  const height = 450;
  const padding = { left: 80, right: 40, top: 40, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const filteredData = useMemo(() => {
    return data.filter((d) => activeCats.includes(d.category));
  }, [data, activeCats]);

  const maxValue = useMemo(() => {
    const allVals = filteredData.flatMap((d) => [d.min, d.max]);
    const max = Math.max(...allVals, 1);
    return Math.ceil((max * 1.1) / 10) * 10;
  }, [filteredData]);

  const toggleCat = (cat: string) => {
    setActiveCats((prev) =>
      prev.includes(cat)
        ? prev.length > 1
          ? prev.filter((c) => c !== cat)
          : prev
        : [...prev, cat],
    );
  };

  const boxElements = useMemo((): BoxMetrics[] => {
    const sectionSize = cW / Math.max(filteredData.length, 1);
    return filteredData.map((d, i) => {
      const x = padding.left + i * sectionSize + sectionSize / 2;
      const boxW = Math.min(sectionSize * 0.6, 50);

      const scaleY = (val: number) =>
        height - padding.bottom - (val / maxValue) * cH;

      return {
        x,
        yMax: scaleY(d.max),
        yQ3: scaleY(d.q3),
        yMedian: scaleY(d.median),
        yQ1: scaleY(d.q1),
        yMin: scaleY(d.min),
        boxW,
        data: d,
      };
    });
  }, [filteredData, maxValue, cW, cH, height, padding]);

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full">
      <div className="ev-mar-b-md">
        <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest block ev-mar-b-xs">
          Select Groups to Compare:
        </span>
        <div className="ev-flex ev-flex-wrap ev-gap-xs">
          {data.map((d) => {
            const isActive = activeCats.includes(d.category);
            return (
              <button
                key={d.category}
                onClick={() => toggleCat(d.category)}
                className={`ev-text-xs ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition ev-border cursor-pointer font-bold ${
                  isActive
                    ? "ev-bg-primary text-white border-transparent shadow-sm"
                    : "ev-bg-alt text-slate-500 border-slate-200 opacity-60 hover:opacity-100"
                }`}
              >
                {d.category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-auto"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const val = Math.round(t * maxValue);
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
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {boxElements.map((b) => (
            <g
              key={b.data.category}
              onMouseEnter={() => setHoveredBox(b)}
              onMouseLeave={() => setHoveredBox(null)}
              className="cursor-pointer"
            >
              <line
                x1={b.x}
                x2={b.x}
                y1={b.yMax}
                y2={b.yMin}
                stroke="#64748b"
                strokeWidth="1.5"
                style={{ transition: "all 0.5s ease" }}
              />
              <line
                x1={b.x - b.boxW / 4}
                x2={b.x + b.boxW / 4}
                y1={b.yMax}
                y2={b.yMax}
                stroke="#64748b"
                strokeWidth="1.5"
                style={{ transition: "all 0.5s ease" }}
              />
              <line
                x1={b.x - b.boxW / 4}
                x2={b.x + b.boxW / 4}
                y1={b.yMin}
                y2={b.yMin}
                stroke="#64748b"
                strokeWidth="1.5"
                style={{ transition: "all 0.5s ease" }}
              />

              <rect
                x={b.x - b.boxW / 2}
                y={b.yQ3}
                width={b.boxW}
                height={Math.max(b.yQ1 - b.yQ3, 1)}
                fill="#6366f1"
                fillOpacity="0.15"
                stroke="#6366f1"
                strokeWidth="2"
                style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />

              <line
                x1={b.x - b.boxW / 2}
                x2={b.x + b.boxW / 2}
                y1={b.yMedian}
                y2={b.yMedian}
                stroke="#4f46e5"
                strokeWidth="3"
                style={{ transition: "all 0.5s ease" }}
              />

              <text
                x={b.x}
                y={height - 20}
                textAnchor="middle"
                className="ev-text-sm font-bold"
                style={{ fill: "#64748b", transition: "all 0.5s ease" }}
              >
                {b.data.category}
              </text>
            </g>
          ))}
        </svg>

        {hoveredBox && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none ev-text-sm"
            style={{
              left: `${(hoveredBox.x / width) * 100}%`,
              top: `${(hoveredBox.yMedian / height) * 100}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="font-bold text-slate-700 uppercase mb-1 border-b pb-1">
              {hoveredBox.data.category}
            </p>
            <div className="grid grid-cols-2 gap-x-4">
              <span>Max:</span>{" "}
              <span className="font-bold">{hoveredBox.data.max}</span>
              <span>Q3:</span>{" "}
              <span className="font-bold">{hoveredBox.data.q3}</span>
              <span className="text-indigo-600">Median:</span>{" "}
              <span className="font-bold">{hoveredBox.data.median}</span>
              <span>Q1:</span>{" "}
              <span className="font-bold">{hoveredBox.data.q1}</span>
              <span>Min:</span>{" "}
              <span className="font-bold">{hoveredBox.data.min}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
