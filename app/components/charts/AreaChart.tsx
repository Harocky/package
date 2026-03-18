"use client";

import { useState, useMemo } from "react";

export type DataPoint = {
  date: string;
  mobile: number;
  desktop: number;
  tablet: number;
};

type Category = keyof Omit<DataPoint, "date">;
type Range = "7d" | "30d" | "90d";

const CAT_CONFIG: Record<
  Category,
  { fill: string; stroke: string; label: string }
> = {
  mobile: { fill: "#6366f1", stroke: "#4f46e5", label: "Mobile" },
  desktop: { fill: "#10b981", stroke: "#059669", label: "Desktop" },
  tablet: { fill: "#f59e0b", stroke: "#d97706", label: "Tablet" },
};

export default function AreaChart({ data }: { data: DataPoint[] }) {
  const [activeCats, setActiveCats] = useState<Category[]>([
    "mobile",
    "desktop",
    "tablet",
  ]);
  const [isStacked, setIsStacked] = useState(true);
  const [range, setRange] = useState<Range>("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // HOLDER 2: Filtered Data
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const counts = { "7d": 7, "30d": 30, "90d": 90 };
    return data.slice(-counts[range]);
  }, [data, range]);

  const width = 800;
  const height = 400;
  const padding = { left: 70, right: 40, top: 40, bottom: 60 };
  const cW = width - padding.left - padding.right;
  const cH = height - padding.top - padding.bottom;

  // Calculate Max Y based on Stacked vs Simple
  const maxValue = useMemo(() => {
    if (isStacked) {
      const totals = filteredData.map((d) =>
        activeCats.reduce((sum, cat) => sum + d[cat], 0),
      );
      return Math.ceil((Math.max(...totals, 1) * 1.1) / 10) * 10;
    }
    const maxSingle = Math.max(
      ...filteredData.flatMap((d) => activeCats.map((c) => d[c])),
    );
    return Math.ceil((maxSingle * 1.1) / 10) * 10;
  }, [filteredData, activeCats, isStacked]);

  // Generate Path Data
  const layers = useMemo(() => {
    const previousY = filteredData.map(() => 0); // Used for stacking

    return activeCats.map((cat) => {
      const points = filteredData.map((d, i) => {
        const val = d[cat];
        const currentTotal = isStacked ? previousY[i] + val : val;
        const x = (i / (filteredData.length - 1)) * cW + padding.left;
        const y = height - padding.bottom - (currentTotal / maxValue) * cH;
        const bottomY =
          height -
          padding.bottom -
          (isStacked ? (previousY[i] / maxValue) * cH : 0);

        if (isStacked) previousY[i] += val;

        return { x, y, bottomY, val };
      });

      const linePath = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
      const areaPath = `${linePath} L ${points[points.length - 1].x} ${points[points.length - 1].bottomY} L ${points[0].x} ${points[0].bottomY} Z`;

      return { cat, areaPath, strokePath: linePath, points };
    });
  }, [
    filteredData,
    activeCats,
    isStacked,
    maxValue,
    cH,
    cW,
    padding.bottom,
    padding.left,
  ]);

  if (filteredData.length === 0)
    return <div className="ev-pad-md">Loading...</div>;

  const toggleCat = (c: Category) =>
    setActiveCats((p) =>
      p.includes(c) ? p.filter((i) => i !== c) : [...p, c],
    );

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full">
      <div className="ev-flex ev-flex-wrap ev-justify-between ev-items-center ev-mar-y-md ev-gap-md">
        <div className="ev-flex ev-gap-sm">
          {(Object.keys(CAT_CONFIG) as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => toggleCat(c)}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-sm ev-transition ev-flex ev-items-center ev-gap-xs cursor-pointer ${activeCats.includes(c) ? "ev-bg-alt font-bold ev-border ev-border-pr" : "opacity-40"}`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: CAT_CONFIG[c].fill }}
              />
              {CAT_CONFIG[c].label}
            </button>
          ))}
        </div>

        <div className="ev-flex ev-bg-alt ev-pad-xs ev-rounded-md ev-gap-xs">
          <button
            onClick={() => setIsStacked(!isStacked)}
            className={`cursor-pointer ev-text-sm ev-pad-xs ev-rounded-sm ${isStacked ? "ev-bg-primary shadow-sm" : ""}`}
          >
            {isStacked ? "Stacked" : "Normal"}
          </button>
          <div className="w-[1px] bg-slate-200 mx-1" />
          {["7d", "30d", "90d"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as Range)}
              className={`ev-text-sm ev-pad-x-md ev-pad-y-xs ev-rounded-sm cursor-pointer ${range === r ? "ev-bg-primary" : "text-slate-400"}`}
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
          <defs>
            {activeCats.map((c) => (
              <linearGradient
                key={c}
                id={`grad-${c}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={CAT_CONFIG[c].fill}
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor={CAT_CONFIG[c].fill}
                  stopOpacity="0.05"
                />
              </linearGradient>
            ))}
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={padding.left}
              x2={width - padding.right}
              y1={padding.top + t * cH}
              y2={padding.top + t * cH}
              stroke="rgba(0,0,0,0.05)"
            />
          ))}

          {/* Area Shapes */}
          {layers.map((l) => (
            <g key={l.cat} className="ev-transition">
              <path
                d={l.areaPath}
                fill={`url(#grad-${l.cat})`}
                style={{ transition: "all 0.6s ease" }}
              />
              <path
                d={l.strokePath}
                fill="none"
                stroke={CAT_CONFIG[l.cat].stroke}
                strokeWidth="2"
                style={{ transition: "all 0.6s ease" }}
              />
            </g>
          ))}

          {/* Hover Logic */}
          {layers[0]?.points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === i && (
                <line
                  x1={p.x}
                  x2={p.x}
                  y1={padding.top}
                  y2={height - padding.bottom}
                  stroke="#cbd5e1"
                  strokeDasharray="4"
                />
              )}
              <rect
                x={p.x - 20}
                y={padding.top}
                width={40}
                height={cH}
                fill="transparent"
                className="ev-cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {hoveredIndex !== null && (
          <div
            className="absolute z-10 ev-bg-alt ev-rounded-md ev-shadow-popover ev-pad-sm ev-border"
            style={{
              left: `${(layers[0].points[hoveredIndex].x / width) * 100}%`,
              top: "0%",
              transform: "translateX(-50%)",
            }}
          >
            <p className="ev-text-sm font-bold text-slate-500">
              {filteredData[hoveredIndex].date}
            </p>
            {activeCats.map((c) => (
              <div
                key={c}
                className="ev-flex ev-justify-between ev-gap-md ev-text-sm"
              >
                <span style={{ color: CAT_CONFIG[c].stroke }}>
                  {CAT_CONFIG[c].label}:
                </span>
                <span className="font-bold">
                  {filteredData[hoveredIndex][c]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
