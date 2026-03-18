"use client";

import React, { useEffect, useRef, useState } from "react";

export type RoadmapStep = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

type Props = {
  steps: RoadmapStep[];
};

export default function EvRoadmap({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  const generatePaths = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPaths: string[] = [];

    for (let i = 0; i < iconRefs.current.length - 1; i++) {
      const start = iconRefs.current[i]?.getBoundingClientRect();
      const end = iconRefs.current[i + 1]?.getBoundingClientRect();

      if (!start || !end) continue;

      const x1 = start.left + start.width / 2 - containerRect.left;
      const y1 = start.top + start.height / 2 - containerRect.top;

      const x2 = end.left + end.width / 2 - containerRect.left;
      const y2 = end.top + end.height / 2 - containerRect.top;

      const midX = (x1 + x2) / 2;

      const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
      newPaths.push(path);
    }

    setPaths(newPaths);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      generatePaths();
    });

    const handleResize = () => {
      requestAnimationFrame(generatePaths);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [steps]);

  return (
    <div className="ev-roadmap" ref={containerRef}>
      <svg className="ev-svg">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>

      {steps.map((step, index) => (
        <div key={index} className="ev-step">
          <div
            className="ev-icon"
            ref={(el) => {
              iconRefs.current[index] = el;
            }}
          >
            {step.icon}
          </div>

          <div className="ev-content">
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
