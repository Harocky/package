"use client";

import React, { useState, useMemo } from "react";

export type RadarMetric = {
  axis: string; // The metric name (e.g., "Speed", "Durability")
  value: number; // Value for this metric
};

export type RadarCategory = {
  id: string; // E.g., "Product A"
  label: string; // E.g., "Team Alpha"
  color: string; // E.g., "#6366f1"
  metrics: RadarMetric[];
};

export default function RadarChart({ data }: { data: RadarCategory[] }) {
  const [activeCategories, setActiveCategories] = useState<string[]>(
    data.map((d) => d.id),
  );
  const [hoveredNode, setHoveredNode] = useState<{
    cat: RadarCategory;
    metric: RadarMetric;
    x: number;
    y: number;
  } | null>(null);

  const width = 600;
  const height = 600;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 80;

  const axes = data[0].metrics;
  const numAxes = axes.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  const maxVal = useMemo(() => {
    return Math.max(
      ...data.flatMap((cat) => cat.metrics.map((m) => m.value)),
      1,
    );
  }, [data]);

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPaths = gridLevels.map((level) => {
    return axes
      .map((_, i) => {
        const r = radius * level;
        const x = cx + r * Math.sin(angleSlice * i);
        const y = cy - r * Math.cos(angleSlice * i);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // Calculate points for the data polygons and metric nodes
  const categoriesWithPositions = useMemo(() => {
    return data
      .filter((cat) => activeCategories.includes(cat.id))
      .map((cat) => {
        const points = cat.metrics
          .map((m, i) => {
            const val = Math.max(m.value, 0);
            const r = radius * (val / maxVal);
            const x = cx + r * Math.sin(angleSlice * i);
            const y = cy - r * Math.cos(angleSlice * i);
            return `${x},${y}`;
          })
          .join(" ");

        const nodes = cat.metrics.map((m, i) => {
          const val = Math.max(m.value, 0);
          const r = radius * (val / maxVal);
          const x = cx + r * Math.sin(angleSlice * i);
          const y = cy - r * Math.cos(angleSlice * i);
          return { ...m, x, y };
        });

        return { ...cat, points, nodes };
      });
  }, [data, activeCategories, maxVal, radius, angleSlice, cx, cy]);

  const toggleCategory = (id: string) => {
    setActiveCategories((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((c) => c !== id)
          : prev
        : [...prev, id],
    );
  };

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-2xl overflow-hidden">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-md ev-gap-md">
        <div>
          <h3 className="ev-text-lg font-bold">Multi-Category Radar</h3>
          <p className="ev-text-sm text-slate-500 font-medium">
            Metric performance comparison.
          </p>
        </div>
        <div className="ev-flex ev-flex-wrap ev-gap-xs justify-end max-w-[300px]">
          {data.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`ev-text-xs ev-pad-xs ev-pad-y-xs ev-rounded-md ev-transition ev-border font-bold cursor-pointer ${
                activeCategories.includes(cat.id)
                  ? "border-slate-300 shadow-sm"
                  : "opacity-30"
              }`}
              style={{
                backgroundColor: activeCategories.includes(cat.id)
                  ? cat.color
                  : "#e2e8f0",
                color: activeCategories.includes(cat.id) ? "white" : "#64748b",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full aspect-square overflow-hidden bg-slate-50/50 ev-rounded-lg border border-slate-100">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full block">
          {/* 1. Background Grid (Web) */}
          <g stroke="#cbd5e1" strokeWidth="0.5" fill="none">
            {gridPaths.map((path, i) => (
              <polygon key={i} points={path} />
            ))}
            {axes.map((_, i) => {
              const x = cx + radius * Math.sin(angleSlice * i);
              const y = cy - radius * Math.cos(angleSlice * i);
              return <line key={i} x1={cx} y1={cy} x2={x} y2={y} />;
            })}
          </g>

          {/* 2. Axis Labels (Metrics) */}
          <g className="ev-text-xs font-bold" fill="#64748b">
            {axes.map((axis, i) => {
              const r = radius + 25; // Offset from grid
              const x = cx + r * Math.sin(angleSlice * i);
              const y = cy - r * Math.cos(angleSlice * i);
              const textAnchor =
                x > cx + 10 ? "start" : x < cx - 10 ? "end" : "middle";
              const alignmentBaseline =
                y > cy + 10 ? "hanging" : y < cy - 10 ? "baseline" : "middle";
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  alignmentBaseline={alignmentBaseline}
                >
                  {axis.axis.toUpperCase()}
                </text>
              );
            })}
          </g>

          {/* 3. Data Polygons (Animated) */}
          {categoriesWithPositions.map((cat) => (
            <g key={cat.id} className="cursor-pointer group">
              <polygon
                points={cat.points}
                fill={cat.color}
                fillOpacity="0.25"
                stroke={cat.color}
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-700 ease-in-out group-hover:fill-opacity-50"
              />

              {/* Metric Interaction Nodes */}
              {cat.nodes.map((node, i) => (
                <circle
                  key={i}
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill={cat.color}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-200 group-hover:r-7"
                  onMouseEnter={() =>
                    setHoveredNode({ cat, metric: node, x: node.x, y: node.y })
                  }
                  onMouseLeave={() => setHoveredNode(null)}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredNode && (
          <div
            className="absolute z-10 bg-slate-900 ev-pad-sm ev-rounded-lg ev-shadow-xl text-white pointer-events-none border border-slate-700 transition-all duration-200"
            style={{
              top: `${(hoveredNode.y / height) * 100}%`,
              left: `${(hoveredNode.x / width) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <div className="ev-flex ev-items-center ev-gap-xs ev-mar-b-xs">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: hoveredNode.cat.color }}
              />
              <p className="ev-text-xs font-bold text-slate-400 uppercase tracking-widest">
                {hoveredNode.cat.label}
              </p>
            </div>
            <p className="ev-text-sm font-bold text-indigo-100">
              {hoveredNode.metric.axis}
            </p>
            <p className="ev-text-lg font-black">
              {hoveredNode.metric.value.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
