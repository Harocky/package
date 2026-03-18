"use client";

import React, { useState, useMemo } from "react";
import EvDropdown from "../ui/EvDropdown";

export type HierarchyNode = {
  id: string;
  label: string;
  value?: number;
  color?: string;
  children?: HierarchyNode[];
};

const getNodeValue = (node: HierarchyNode): number => {
  if (node.value) return node.value;
  return (
    node.children?.reduce((sum, child) => sum + getNodeValue(child), 0) || 0
  );
};

export default function HierarchyChart({ data }: { data: HierarchyNode }) {
  const [hoveredPath, setHoveredPath] = useState<string[]>([]);
  const [maxDepth, setMaxDepth] = useState(5);
  const [open, setOpen] = useState(false);

  const width = 600;
  const height = 600;
  const cx = width / 2;
  const cy = height / 2;
  const totalRadius = Math.min(width, height) / 2 - 40;

  const totalValue = useMemo(() => getNodeValue(data), [data]);

  const depthOptions = [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" },
    { label: "Level 5", value: "5" },
  ];

  // Helper to calculate radius based on depth to ensure Level 1 isn't too small
  const getRadiusForDepth = (depth: number) => {
    if (depth === 0) return 60; // Size of the center white hole

    const availableRadius = totalRadius - 60;
    // We distribute the remaining space across the visible levels
    const step = availableRadius / maxDepth;
    return 60 + depth * step;
  };

  const getArcPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number,
  ) => {
    const sA = startAngle - Math.PI / 2;
    const eA = endAngle - Math.PI / 2;

    const x1 = cx + innerR * Math.cos(sA);
    const y1 = cy + innerR * Math.sin(sA);
    const x2 = cx + outerR * Math.cos(sA);
    const y2 = cy + outerR * Math.sin(sA);
    const x3 = cx + outerR * Math.cos(eA);
    const y3 = cy + outerR * Math.sin(eA);
    const x4 = cx + innerR * Math.cos(eA);
    const y4 = cy + innerR * Math.sin(eA);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1} Z`;
  };

  const renderSlices = (
    node: HierarchyNode,
    startAngle: number,
    endAngle: number,
    depth: number,
    path: string[],
    parentColor?: string,
  ): React.ReactNode[] => {
    if (depth > maxDepth) return [];

    const currentPath = [...path, node.id];
    const val = getNodeValue(node);
    const range = endAngle - startAngle;

    // Improved Radial logic: Level 1 now has a fixed minimum width
    const inner = getRadiusForDepth(depth - 1);
    const outer = getRadiusForDepth(depth);

    const currentColor = node.color || parentColor || "#6366f1";
    const isHovered = hoveredPath.includes(node.id);
    const isDirectHover = hoveredPath[hoveredPath.length - 1] === node.id;
    const elements: React.ReactNode[] = [];

    if (depth > 0 && range > 0.001) {
      elements.push(
        <path
          key={node.id}
          d={getArcPath(startAngle, endAngle, inner, outer)}
          fill={currentColor}
          fillOpacity={
            hoveredPath.length === 0 || isHovered ? 0.3 + depth * 0.12 : 0.1
          }
          stroke="white"
          strokeWidth={isDirectHover ? "3" : "1"}
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredPath(currentPath)}
          onMouseLeave={() => setHoveredPath([])}
        />,
      );
    }

    if (node.children && depth < maxDepth) {
      let currentStart = startAngle;
      node.children.forEach((child) => {
        const childVal = getNodeValue(child);
        const childRange = (childVal / val) * range;
        elements.push(
          ...renderSlices(
            child,
            currentStart,
            currentStart + childRange,
            depth + 1,
            currentPath,
            currentColor,
          ),
        );
        currentStart += childRange;
      });
    }

    return elements;
  };

  return (
    <div className="ev-bg-main ev-rounded-2xl ev-shadow-lg ev-border border-gray-100 ev-pad-lg w-full max-w-2xl overflow-hidden">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-lg">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Hierarchy Directory
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            Proportional Multi-level view
          </p>
        </div>
        <div className="w-40">
          <EvDropdown
            open={open}
            options={depthOptions}
            selected={maxDepth.toString()}
            onToggle={() => setOpen(!open)}
            onClose={() => setOpen(false)}
            onSelect={(val) => setMaxDepth(Number(val))}
            placeholder="Visibility"
          />
        </div>
      </div>

      <div className="relative flex justify-center items-center py-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block overflow-visible drop-shadow-sm"
        >
          {renderSlices(data, 0, 2 * Math.PI, 0, [])}

          <circle
            cx={cx}
            cy={cy}
            r={55}
            fill="white"
            className="shadow-inner"
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            alignmentBaseline="middle"
            className="text-2xl font-black text-gray-900"
          >
            {totalValue.toLocaleString()}
          </text>
        </svg>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full ev-flex ev-justify-center ev-gap-1 px-4">
          {hoveredPath.slice(1).map((id, i) => (
            <React.Fragment key={id}>
              <span className="text-[11px] font-bold text-gray-700 bg-white border border-gray-100 px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                {id}
              </span>
              {i < hoveredPath.length - 2 && (
                <span className="text-gray-300 self-center">›</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
