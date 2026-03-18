"use client";

import React, { useState, useMemo } from "react";

export type SankeyNode = {
  id: string;
  name: string;
  column: number;
};

export type SankeyLink = {
  source: string;
  target: string;
  value: number;
};

export type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

interface LayoutLink extends SankeyLink {
  path: string;
  thickness: number;
  id: string;
  color: string;
}

interface LayoutNode extends SankeyNode {
  x: number;
  y: number;
  h: number;
  value: number;
}

const FLOW_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#3b82f6",
  "#8b5cf6",
];

export default function SankeyChart({ data }: { data: SankeyData }) {
  const [hoveredLink, setHoveredLink] = useState<LayoutLink | null>(null);

  const width = 1000;
  const height = 600;
  const nodeWidth = 12;
  const padding = { top: 60, bottom: 40, left: 50, right: 50 };

  const cH = height - padding.top - padding.bottom;
  const cW = width - padding.left - padding.right;

  const layout = useMemo(() => {
    const columns = Array.from(new Set(data.nodes.map((n) => n.column))).sort(
      (a, b) => a - b,
    );
    const colWidth = cW / (columns.length - 1);

    const nodesWithPos: LayoutNode[] = data.nodes.map((node, nodeIdx) => {
      const colNodes = data.nodes.filter((n) => n.column === node.column);
      const indexInCol = colNodes.indexOf(node);
      const spacing = cH / colNodes.length;

      const inVal = data.links
        .filter((l) => l.target === node.id)
        .reduce((s, l) => s + l.value, 0);
      const outVal = data.links
        .filter((l) => l.source === node.id)
        .reduce((s, l) => s + l.value, 0);
      const nodeValue = Math.max(inVal, outVal);

      // Height based on total volume (approx 3000 max for this dataset)
      const h = Math.max((nodeValue / 3000) * cH, 8);

      return {
        ...node,
        x: padding.left + node.column * colWidth,
        y: padding.top + indexInCol * spacing + (spacing - h) / 2,
        h,
        value: nodeValue,
      };
    });

    const sourceOffsets: Record<string, number> = {};
    const targetOffsets: Record<string, number> = {};

    const linksWithPaths: LayoutLink[] = data.links
      .map((link, idx) => {
        const source = nodesWithPos.find((n) => n.id === link.source);
        const target = nodesWithPos.find((n) => n.id === link.target);

        if (!source || !target) return null;

        const sOffset = sourceOffsets[link.source] || 0;
        const tOffset = targetOffsets[link.target] || 0;
        const thickness = (link.value / 3000) * cH;

        const x0 = source.x + nodeWidth;
        const y0 = source.y + sOffset + thickness / 2;
        const x1 = target.x;
        const y1 = target.y + tOffset + thickness / 2;

        const cpx = (x1 - x0) / 2;
        const path = `M ${x0} ${y0} C ${x0 + cpx} ${y0}, ${x1 - cpx} ${y1}, ${x1} ${y1}`;

        sourceOffsets[link.source] = sOffset + thickness;
        targetOffsets[link.target] = tOffset + thickness;

        // Assign color based on the first column source to keep patterns consistent
        const colorIdx = data.nodes.findIndex((n) => n.id === link.source);

        return {
          ...link,
          path,
          thickness,
          id: `link-${idx}`,
          color: FLOW_COLORS[colorIdx % FLOW_COLORS.length],
        };
      })
      .filter((l): l is LayoutLink => l !== null);

    return { nodes: nodesWithPos, links: linksWithPaths };
  }, [data, cH, cW]);

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-6xl">
      <div className="ev-mar-b-lg ev-flex ev-justify-between ev-items-center">
        <div>
          <h3 className="ev-text-lg font-bold">Organization Flow Pattern</h3>
          <p className="ev-text-sm text-slate-500 font-medium">
            Tracing multi-level dependencies across stages.
          </p>
        </div>
        <div className="ev-flex ev-gap-md">
          <div className="ev-flex ev-items-center ev-gap-xs">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="ev-text-xs font-bold text-slate-400 uppercase">
              Input
            </span>
          </div>
          <div className="ev-flex ev-items-center ev-gap-xs">
            <div className="w-3 h-3 rounded-full bg-slate-800" />
            <span className="ev-text-xs font-bold text-slate-400 uppercase">
              Output
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full block overflow-visible"
        >
          {/* Render Flows */}
          {layout.links.map((link) => (
            <path
              key={link.id}
              d={link.path}
              fill="none"
              stroke={link.color}
              strokeWidth={Math.max(link.thickness, 2)}
              strokeOpacity={hoveredLink?.id === link.id ? 0.8 : 0.25}
              className="ev-transition cursor-pointer"
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ transition: "stroke-opacity 0.3s ease" }}
            />
          ))}

          {/* Render Nodes */}
          {layout.nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={node.h}
                fill="#1e293b"
                rx={2}
              />
              <text
                x={node.x + nodeWidth / 2}
                y={node.y - 12}
                textAnchor="middle"
                className="ev-text-xs font-bold uppercase tracking-tighter"
                style={{ fill: "#64748b", fontSize: "10px" }}
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Improved High-Contrast Tooltip */}
        {hoveredLink && (
          <div
            className="absolute z-20 ev-bg-alt ev-pad-sm ev-rounded-lg ev-shadow-popover ev-border bg-slate-900 border-slate-700 pointer-events-none"
            style={{
              top: "20px",
              right: "20px",
              minWidth: "180px",
            }}
          >
            <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-xs">
              <span className="ev-text-xs font-bold text-slate-400 uppercase tracking-widest">
                Flow Data
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hoveredLink.color }}
              />
            </div>
            <p className="ev-text-md font-bold text-white">
              Value: {hoveredLink.value.toLocaleString()}
            </p>
            <div className="ev-mar-t-xs ev-pad-t-xs border-t border-slate-700 ev-flex ev-flex-col ev-gap-xs">
              <p className="ev-text-xs text-slate-400">
                Source:{" "}
                <span className="text-white font-medium">
                  {hoveredLink.source}
                </span>
              </p>
              <p className="ev-text-xs text-slate-400">
                Target:{" "}
                <span className="text-white font-medium">
                  {hoveredLink.target}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
