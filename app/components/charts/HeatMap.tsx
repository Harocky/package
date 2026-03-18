"use client";

import React, { useState, useMemo } from "react";

export type HeatmapCell = {
  x: string;
  y: number;
  value: number;
};

const THEMES = {
  ruby: ["#fff1f2", "#ffe4e6", "#fb7185", "#e11d48", "#9f1239"],
  emerald: ["#f0fdf4", "#dcfce7", "#34d399", "#059669", "#064e3b"],
  amethyst: ["#faf5ff", "#f3e8ff", "#a855f7", "#7e22ce", "#581c87"],
  sapphire: ["#f0f9ff", "#e0f2fe", "#38bdf8", "#0284c7", "#0c4a6e"],
};

export default function Heatmap({ data }: { data: HeatmapCell[] }) {
  const [theme, setTheme] = useState<keyof typeof THEMES>("ruby");
  const [hovered, setHovered] = useState<HeatmapCell | null>(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxVal = useMemo(
    () => Math.max(...data.map((d) => d.value), 1),
    [data],
  );

  const getColor = (value: number) => {
    if (value === 0) return THEMES[theme][0];
    const idx = Math.min(
      Math.floor((value / maxVal) * (THEMES[theme].length - 1)) + 1,
      THEMES[theme].length - 1,
    );
    return THEMES[theme][idx];
  };

  return (
    <div className="ev-bg-main ev-rounded-2xl ev-shadow-xl ev-border border-gray-100 ev-pad-lg w-full max-w-lg">
      <div className="ev-flex ev-justify-between ev-items-center ev-mar-b-lg">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Activity Matrix
          </h3>
          <p className="text-xs text-gray-500 font-medium italic">
            Scroll to explore 24h cycle
          </p>
        </div>

        <div className="ev-flex ev-gap-xs ev-bg-alt ev-pad-xs ev-rounded-xl border border-gray-100">
          {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                theme === t
                  ? "border-white ring-2 ring-gray-200"
                  : "border-transparent opacity-60"
              }`}
              style={{ backgroundColor: THEMES[t][3] }}
            />
          ))}
        </div>
      </div>

      {/* Header Alignment with ev-padding */}
      <div className="ev-flex ev-mar-b-xs pl-12 pr-1">
        {days.map((day) => (
          <div key={day} className="flex-1 text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {day[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable Container with your utility spacing */}
      <div className="relative h-[450px] overflow-y-auto pr-2 custom-scrollbar border-y border-gray-50 ev-pad-y-md">
        <div className="ev-flex ev-gap-md min-h-full">
          {/* Y-Axis: Adjusted for Square Sizing */}
          <div className="ev-flex flex-col justify-between text-[10px] font-bold text-gray-300 w-9 text-right pr-2">
            {hours.map((h) => (
              <span
                key={h}
                className="aspect-square flex items-center justify-end leading-none"
              >
                {h.toString().padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* Grid of Squares */}
          <div className="ev-flex flex-1 ev-justify-between ev-gap-xs">
            {days.map((day) => (
              <div key={day} className="ev-flex flex-col ev-gap-xs flex-1">
                {hours.map((hour) => {
                  const cell = data.find(
                    (d) => d.x === day && d.y === hour,
                  ) || { x: day, y: hour, value: 0 };
                  const isHovered = hovered?.x === day && hovered?.y === hour;

                  return (
                    <div
                      key={hour}
                      onMouseEnter={() => setHovered(cell)}
                      onMouseLeave={() => setHovered(null)}
                      className="w-full aspect-square rounded-sm cursor-pointer transition-all duration-150 border border-white/10"
                      style={{
                        backgroundColor: getColor(cell.value),
                        transform: isHovered ? "scale(1.2)" : "none",
                        zIndex: isHovered ? 20 : 1,
                        boxShadow: isHovered
                          ? "0 4px 12px rgba(0,0,0,0.15)"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ev-mar-t-lg ev-pad-y-sm border-t border-gray-50 ev-flex ev-justify-between ev-items-center">
        <div className="text-[12px] font-bold text-gray-700">
          {hovered ? (
            <span className="ev-flex ev-items-center ev-gap-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getColor(hovered.value) }}
              />
              {hovered.x} {hovered.y}:00 —{" "}
              <span className="text-gray-400">{hovered.value} hits</span>
            </span>
          ) : (
            <span className="text-gray-400 font-medium italic">
              Inspect squares
            </span>
          )}
        </div>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
          {theme}
        </span>
      </div>
    </div>
  );
}
