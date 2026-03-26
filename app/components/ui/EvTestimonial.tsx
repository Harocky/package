"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  highlight: string;
  quote: string;
  location: string;
};

export default function EvTestimonial({ data }: { data: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const x = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const doubledData = [...data, ...data];

  useEffect(() => {
    const animate = () => {
      const track = trackRef.current;
      if (!track) return;

      if (!isHovered.current && !isDragging.current) {
        x.current -= 1.8;
      }

      const halfWidth = track.scrollWidth / 2;

      if (x.current <= -halfWidth) {
        x.current += halfWidth;
      } else if (x.current > 0) {
        x.current -= halfWidth;
      }

      track.style.transform = `translateX(${x.current}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    startScroll.current = x.current;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grabbing";
      trackRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.pageX - startX.current;
    x.current = startScroll.current + dx;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  };

  return (
    <div className="relative w-full overflow-hidden ev-bg-alt ev-pad-y-lg">
      <div
        className="ev-flex ev-gap-md w-[max-content] cursor-grab ev-pad-x-md"
        ref={trackRef}
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => {
          isHovered.current = false;
          handlePointerUp();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {doubledData.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-[350px] md:w-[400px] flex-shrink-0 ev-mar-t-xl"
          >
            <div className="relative ev-bg-main rounded-2xl shadow-sm border border-gray-100 ev-pad-lg ev-pad-t-lg ev-flex ev-flex-col ev-items-center text-center h-full select-none">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full border-[5px] border-white shadow-sm overflow-hidden bg-gray-200">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    width={100}
                    height={100}
                  />
                </div>
              </div>

              <h3 className="text-gray-900 font-bold text-lg leading-tight ev-mar-t-2xl">
                {item.name}
              </h3>
              <p className="text-gray-500 text-[13px] font-medium ev-mar-b-md">
                {item.role}
              </p>

              <div className="relative w-full flex-grow ev-flex ev-flex-col ev-justify-start ev-pad-t-xs">
                <span className="absolute -top-8 -left-2 text-8xl text-blue-50/70 font-serif leading-none select-none pointer-events-none">
                  &ldquo;
                </span>
                <span className="absolute top-8 -right-2 text-8xl text-blue-50/70 font-serif leading-none select-none pointer-events-none">
                  &rdquo;
                </span>

                <p className="text-[#3b82f6] font-bold text-[15px] ev-mar-b-sm relative z-10 ev-pad-x-xs leading-relaxed">
                  {item.highlight}
                </p>

                <p className="text-gray-500 text-sm leading-relaxed relative z-10 px-1">
                  {item.quote}
                </p>
              </div>

              <div className="ev-mar-t-md ev-pad-t-sm border-t border-gray-100 w-full">
                <p className="text-gray-600 font-bold text-[11px] uppercase tracking-widest">
                  {item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
