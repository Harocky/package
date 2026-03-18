"use client";

import React, { useState, useMemo } from "react";

export type MapPin = {
  id: string;
  name: string;
  value: number;
  lat: number;
  lng: number;
  category: string;
};

// High-quality Mercator Projection Map URL
const MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mercator-projection.jpg/1200px-Mercator-projection.jpg";

export default function WorldMap({ data }: { data: MapPin[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const width = 1000;
  const height = 650; // Adjusted height for standard Mercator aspect ratio

  /**
   * Mercator Projection Calculation
   * Maps Latitude/Longitude to X/Y pixels on the image
   */
  const getXY = (lat: number, lng: number) => {
    // X is linear
    const x = (lng + 180) * (width / 360);

    // Y is logarithmic in Mercator projection
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    // Scale and center the Y coordinate
    const y = height / 2 - (width * mercN) / (2 * Math.PI);

    return { x, y };
  };

  const maxVal = useMemo(
    () => Math.max(...data.map((d) => d.value), 1),
    [data],
  );

  const pins = useMemo(() => {
    return data.map((d) => {
      const { x, y } = getXY(d.lat, d.lng);
      const radius = (d.value / maxVal) * 15 + 6;
      return { ...d, x, y, radius };
    });
  }, [data, maxVal]);

  return (
    <div className="ev-bg-main ev-rounded-lg ev-shadow-md ev-border ev-pad-md w-full max-w-6xl overflow-hidden">
      <div className="ev-mar-b-md ev-flex ev-justify-between ev-items-end">
        <div>
          <h3 className="ev-text-lg font-bold">Global Data Nodes</h3>
          <p className="ev-text-sm text-slate-500 fon   t-medium">
            Map-image overlay with Mercator projection.
          </p>
        </div>
        <div className="ev-text-xs font-bold text-indigo-600 ev-bg-alt ev-pad-xs ev-pad-y-xs ev-rounded-md">
          {data.length} Active Locations
        </div>
      </div>

      <div className="relative w-full aspect-[10/6.5] bg-slate-200 ev-rounded-xl border border-slate-300 overflow-hidden shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full block">
          {/* 1. The World Map Image */}
          <image
            href={MAP_URL}
            width={width}
            height={height}
            preserveAspectRatio="none"
            opacity="0.8"
          />

          {/* 2. Grid Overlay (Optional, for better "data" feel) */}
          <g opacity="0.1" stroke="white" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={i * (width / 12)}
                y1={0}
                x2={i * (width / 12)}
                y2={height}
              />
            ))}
          </g>

          {/* 3. Data Pins */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              onMouseEnter={() => setHoveredId(pin.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              {/* Pulse Animation on Hover */}
              {hoveredId === pin.id && (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={pin.radius}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="r"
                    from={pin.radius}
                    to={pin.radius + 20}
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    from="1"
                    to="0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Pin Base */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={pin.radius}
                fill="#6366f1"
                fillOpacity={hoveredId === pin.id ? 1 : 0.75}
                stroke="white"
                strokeWidth="2"
                style={{
                  transition: "all 0.3s ease",
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredId && (
          <div
            className="absolute z-10 bg-slate-900 ev-pad-sm ev-rounded-lg ev-shadow-2xl text-white border border-slate-700 pointer-events-none transition-all"
            style={{
              left: `${(pins.find((p) => p.id === hoveredId)!.x / width) * 100}%`,
              top: `${(pins.find((p) => p.id === hoveredId)!.y / height) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <p className="ev-text-xs font-bold text-indigo-400 uppercase tracking-widest">
              {pins.find((p) => p.id === hoveredId)!.category}
            </p>
            <p className="ev-text-md font-bold">
              {pins.find((p) => p.id === hoveredId)!.name}
            </p>
            <p className="ev-text-xl font-bold text-white mt-1">
              {pins.find((p) => p.id === hoveredId)!.value.toLocaleString()}
            </p>
            <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -translate-x-1/2" />
          </div>
        )}
      </div>
    </div>
  );
}
