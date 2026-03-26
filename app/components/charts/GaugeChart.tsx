"use client";

import { useState, useMemo } from "react";
import EvDropdown from "../ui/EvDropdown";

export type GaugeMetric = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  color: string;
};

export default function GaugeChart({ metrics }: { metrics: GaugeMetric[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const active = metrics[selectedIndex];

  const dropdownOptions = useMemo(
    () => metrics.map((m, i) => ({ label: m.label, value: i.toString() })),
    [metrics],
  );

  // SVG Constants
  const width = 400;
  const height = 260; // Increased to prevent bottom overflow
  const cx = width / 2;
  const cy = height - 60; // Fixed pivot point
  const radius = 140;

  const needleRotation = useMemo(() => {
    const range = active.max - active.min;
    const clampedValue = Math.min(
      Math.max(active.value, active.min),
      active.max,
    );
    const percentage = (clampedValue - active.min) / range;
    return percentage * 180 - 90;
  }, [active]);

  return (
    <div className="ev-bg-main ev-rounded-2xl ev-shadow-lg ev-border ev-rounded-xl border-gray-100 ev-pad-lg w-full max-w-md transition-all duration-500 hover:shadow-xl">
      <div className="ev-flex ev-justify-between ev-items-start ev-mar-b-xl ev-gap-md relative z-50">
        <div className="flex-1">
          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">
            Diagnostic Gauge
          </h3>
          <p className="text-[13px] text-gray-500 font-medium">
            Real-time hardware status
          </p>
        </div>
        {dropdownOptions.length >= 2 && (
          <div className="w-44">
            <EvDropdown
              open={isDropdownOpen}
              options={dropdownOptions}
              selected={selectedIndex.toString()}
              onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              onClose={() => setIsDropdownOpen(false)}
              onSelect={(val) => setSelectedIndex(Number(val))}
              placeholder="Metric"
            />
          </div>
        )}
      </div>

      <div className="relative flex justify-center items-center ev-mar-t-md overflow-visible">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block overflow-visible"
          style={{ filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.03))" }}
        >
          {/* Background Track */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="32"
            strokeLinecap="round"
          />

          {/* Active Colored Track - Sharp Fill */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={active.color}
            strokeWidth="32"
            strokeLinecap="round"
            strokeDasharray={`${((active.value - active.min) / (active.max - active.min)) * (Math.PI * radius)}, ${Math.PI * radius}`}
            style={{
              transition:
                "stroke-dasharray 0.5s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.3s ease",
            }}
          />

          {/* Pivot Hub */}
          <circle cx={cx} cy={cy} r="12" fill="#111827" />
          <circle cx={cx} cy={cy} r="5" fill="white" opacity="0.2" />

          {/* Needle - High Speed Sharp Movement */}
          <g
            transform={`rotate(${needleRotation}, ${cx}, ${cy})`}
            style={{
              // This bezier curve provides a "Snap-to" feel without excessive bouncing
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <path
              d={`M ${cx - 4} ${cy} L ${cx} ${cy - radius + 10} L ${cx + 4} ${cy} Z`}
              fill="#111827"
              className="drop-shadow-md"
            />
          </g>

          {/* Bottom Labels - Fixed Position & Alignment */}
          <g className="font-bold text-[12px] select-none" fill="#9ca3af">
            <text x={cx - radius} y={cy + 35} textAnchor="middle">
              {active.min}
            </text>
            <text x={cx + radius} y={cy + 35} textAnchor="middle">
              {active.max}
            </text>
          </g>

          {/* Main Reading */}
          <text
            x={cx}
            y={cy - 45}
            textAnchor="middle"
            className="text-4xl font-black tracking-tighter"
            fill="#111827"
          >
            {active.value}
            <tspan className="text-base font-bold text-gray-400" dx="3">
              {active.unit}
            </tspan>
          </text>
        </svg>
      </div>

      <div className="ev-mar-t-lg ev-pad-md ev-bg-gray-50 ev-rounded-xl ev-flex ev-justify-center border border-gray-100">
        <div className="ev-flex ev-items-center ev-gap-sm">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: active.color }}
          />
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.1em]">
            Monitoring <span className="text-gray-900">{active.label}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
