"use client";

import { useRef } from "react";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
};

export default function EvSlider({
  label,
  value,
  min,
  max,
  onChange,
  unit = "",
}: SliderProps) {
  const ref = useRef<HTMLInputElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="ev-flex ev-flex-col ev-gap-sm w-full max-w-[500px] relative">
      <label className="ev-text-sm font-bold uppercase text-emerald-600 tracking-widest">
        {label}: {value}
        {unit}
      </label>

      <div className="relative w-full">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="ev-slider"
          style={{
            background: `linear-gradient(to right, #10b981 ${percentage}%, #e2e8f0 ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
}
