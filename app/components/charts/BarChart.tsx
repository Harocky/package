"use client";

import React, { useState, useMemo } from "react";
import EvDropdown from "@/app/components/ui/EvDropdown";

export type BarData = {
  category: string;
  q1: number;
  q2: number;
  q3: number;
};

type Metric = keyof Omit<BarData, "category">;
type Orientation = "vertical" | "horizontal";
type Mode = "grouped" | "stacked";

interface BarRect {
  x: number;
  y: number;
  bW: number;
  bH: number;
  val: number;
  metric: Metric;
  category: string;
  id: string;
}

const BAR_COLORS: Record<Metric, string> = {
  q1: "#6366f1",
  q2: "#10b981",
  q3: "#f59e0b",
};

export default function BarChart({ data }: { data: BarData[] }) {
  const [metrics, setMetrics] = useState<Metric[]>(["q1", "q2", "q3"]);
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const [mode, setMode] = useState<Mode>("grouped");
  const [hoveredBar, setHoveredBar] = useState<BarRect | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const width = 800;
  const height = 450;
  const padding = { left: 80, right: 40, top: 40, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  const modeOptions = [
    { label: "Grouped Bars", value: "grouped" },
    { label: "Stacked Bars", value: "stacked" },
  ];

  const maxValue = useMemo(() => {
    if (!data.length) return 100;
    if (mode === "stacked" && orientation === "vertical") {
      const totals = data.map((d) => metrics.reduce((sum, m) => sum + d[m], 0));
      return Math.max(...totals, 1) * 1.1;
    }
    const allVals = data.flatMap((d) => metrics.map((m) => d[m]));
    return Math.max(...allVals, 1) * 1.1;
  }, [data, metrics, mode, orientation]);

  const bars = useMemo((): BarRect[][] => {
    return data.map((d, i) => {
      const sectionSize = (orientation === "vertical" ? cW : cH) / data.length;
      const gap = sectionSize * 0.2;
      const availableSize = sectionSize - gap;
      let currentStackPos = 0;

      return metrics.map((m, mIdx) => {
        const val = d[m];
        const barSize =
          (val / maxValue) * (orientation === "vertical" ? cH : cW);
        let x, y, bW, bH;

        if (orientation === "vertical") {
          bW =
            mode === "grouped" ? availableSize / metrics.length : availableSize;
          bH = barSize;
          x =
            padding.left +
            i * sectionSize +
            gap / 2 +
            (mode === "grouped" ? mIdx * bW : 0);
          y =
            height -
            padding.bottom -
            (mode === "stacked" ? currentStackPos + bH : bH);
          if (mode === "stacked") currentStackPos += bH;
        } else {
          bH =
            mode === "grouped" ? availableSize / metrics.length : availableSize;
          bW = barSize;
          x = padding.left + (mode === "stacked" ? currentStackPos : 0);
          y =
            padding.top +
            i * sectionSize +
            gap / 2 +
            (mode === "grouped" ? mIdx * bH : 0);
          if (mode === "stacked") currentStackPos += bW;
        }

        return {
          x,
          y,
          bW,
          bH,
          val,
          metric: m,
          category: d.category,
          id: `${i}-${m}`,
        };
      });
    });
  }, [data, metrics, orientation, mode, maxValue, cW, cH, height, padding]);

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  const toggleMetric = (m: Metric) => {
    setMetrics((prev) =>
      prev.includes(m)
        ? prev.length > 1
          ? prev.filter((i) => i !== m)
          : prev
        : [...prev, m],
    );
  };

  if (!data.length) return <div className="ev-pad-md">No data...</div>;

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full h-full">
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-center ev-mar-y-md ev-gap-md">
        <div className="ev-flex ev-items-center ev-gap-sm">
          <span className="ev-text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">
            Metrics:
          </span>
          <div className="ev-flex ev-pad-xs ev-gap-xs">
            {(Object.keys(BAR_COLORS) as Metric[]).map((m) => {
              const isActive = metrics.includes(m);
              return (
                <button
                  key={m}
                  onClick={() => toggleMetric(m)}
                  className={`ev-flex ev-items-center ev-gap-xs ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition ev-text-sm font-bold cursor-pointer ${
                    isActive
                      ? "ev-bg-main shadow-sm ev-border text-slate-900"
                      : "text-slate-400 opacity-60"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: BAR_COLORS[m] }}
                  />
                  {m.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ev-flex ev-items-center ev-gap-sm">
          <div className="ev-flex ev-bg-alt ev-pad-xs ev-rounded-xl ev-gap-xs">
            <button
              onClick={() => setOrientation("vertical")}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition cursor-pointer ${
                orientation === "vertical"
                  ? "ev-bg-primary text-white shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Vertical
            </button>
            <button
              onClick={() => setOrientation("horizontal")}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-lg ev-transition cursor-pointer ${
                orientation === "horizontal"
                  ? "ev-bg-primary text-white shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Horizontal
            </button>
          </div>

          <div className="w-[180px]">
            <EvDropdown
              open={isDropdownOpen}
              options={modeOptions}
              selected={mode}
              onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              onClose={() => setIsDropdownOpen(false)}
              onSelect={(val) => setMode(val as Mode)}
            />
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible w-full h-auto"
        >
          {yTicks.map((t) => {
            const val = Math.round(t * maxValue);
            const pos =
              orientation === "vertical"
                ? padding.top + (1 - t) * cH
                : padding.left + t * cW;

            return (
              <g key={t}>
                {orientation === "vertical" ? (
                  <>
                    <line
                      x1={padding.left}
                      x2={width - padding.right}
                      y1={pos}
                      y2={pos}
                      stroke="rgba(0,0,0,0.05)"
                    />
                    <text
                      x={padding.left - 15}
                      y={pos}
                      textAnchor="end"
                      alignmentBaseline="middle"
                      className="ev-text-sm"
                      style={{ fill: "#94a3b8" }}
                    >
                      {val.toLocaleString()}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={pos}
                      x2={pos}
                      y1={padding.top}
                      y2={height - padding.bottom}
                      stroke="rgba(0,0,0,0.05)"
                    />
                    <text
                      x={pos}
                      y={height - padding.bottom + 20}
                      textAnchor="middle"
                      className="ev-text-sm"
                      style={{ fill: "#94a3b8" }}
                    >
                      {val.toLocaleString()}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {bars.flat().map((b) => (
            <rect
              key={b.id}
              x={b.x}
              y={b.y}
              width={Math.max(b.bW, 0)}
              height={Math.max(b.bH, 0)}
              fill={BAR_COLORS[b.metric]}
              rx={4}
              className="cursor-pointer"
              style={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: hoveredBar && hoveredBar.id !== b.id ? 0.3 : 1,
              }}
              onMouseEnter={() => setHoveredBar(b)}
              onMouseLeave={() => setHoveredBar(null)}
            />
          ))}

          {data.map((d, i) => {
            const sectionSize =
              (orientation === "vertical" ? cW : cH) / data.length;
            const pos = i * sectionSize + sectionSize / 2;
            return (
              <text
                key={i}
                x={
                  orientation === "vertical"
                    ? padding.left + pos
                    : padding.left - 15
                }
                y={orientation === "vertical" ? height - 25 : padding.top + pos}
                textAnchor={orientation === "vertical" ? "middle" : "end"}
                alignmentBaseline="middle"
                className="ev-text-sm font-bold"
                style={{ fill: "#64748b" }}
              >
                {d.category}
              </text>
            );
          })}
        </svg>

        {hoveredBar && (
          <div
            className="absolute z-10 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border pointer-events-none"
            style={{
              left: `${(hoveredBar.x / width) * 100}%`,
              top: `${(hoveredBar.y / height) * 100}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-500 uppercase">
              {hoveredBar.category}
            </p>
            <p
              className="ev-text-md font-bold"
              style={{ color: BAR_COLORS[hoveredBar.metric] }}
            >
              {hoveredBar.metric.toUpperCase()}:{" "}
              {hoveredBar.val.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
