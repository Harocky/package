"use client";

import Image from "next/image";
import { useState, useRef } from "react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  review: string;
};

type Props = {
  testimonials: Testimonial[];
  content: {
    title: string;
    subtitle: string;
  };
};

const TestimonialSlider = ({ testimonials, content }: Props) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startX = useRef<number>(0);

  const totalItems = testimonials.length;
  const cardWidthWithGap = 360;
  const rotationIntensity = 15;

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const dragDistance = clientX - startX.current;

    if (Math.abs(dragDistance) > 80) {
      if (dragDistance > 0 && activeIdx > 0) {
        setActiveIdx((prev) => prev - 1);
      } else if (dragDistance < 0 && activeIdx < totalItems - 1) {
        setActiveIdx((prev) => prev + 1);
      }
      setIsDragging(false);
    }
  };

  return (
    <div
      className="flex flex-col h-[80vh] bg-slate-50 overflow-hidden relative"
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <header className="flex flex-col items-center justify-center text-center z-50 py-5">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-slate-900">
          {content.title}
        </h1>
        <p className="text-slate-500 mt-4">{content.subtitle}</p>
      </header>

      <section
        className="flex-1 relative w-full flex justify-center items-start pt-5"
        onMouseDown={(e) => handleStart(e.pageX)}
        onMouseMove={(e) => handleMove(e.pageX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <div
          className="flex absolute left-1/2 will-change-transform transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]"
          style={{
            transform: `translateX(${-activeIdx * cardWidthWithGap}px)`,
          }}
        >
          {testimonials.map((item, i) => {
            const distance = i - activeIdx;
            const rotation = distance * rotationIntensity;
            const yOffset = Math.abs(distance) * 20;

            return (
              <div
                key={i}
                onClick={() => setActiveIdx(i)}
                className="absolute w-[320px] h-[420px] cursor-pointer transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]"
                style={{
                  left: `${i * cardWidthWithGap}px`,
                  marginLeft: "-160px",
                  transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
                  opacity: Math.abs(distance) > 2 ? 0.3 : 1,
                  zIndex: totalItems - Math.abs(distance),
                }}
              >
                <div className="w-full h-full bg-white rounded-[32px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col items-center text-center select-none">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-xl mb-5"
                  />
                  <h3 className="m-0 font-semibold">{item.name}</h3>
                  <span className="text-slate-400 text-sm">{item.role}</span>
                  <div className="my-4 text-amber-500">★★★★★</div>
                  <p className="text-slate-600 text-[0.95rem]">{item.review}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
          disabled={activeIdx === 0}
          className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-md text-lg hover:bg-slate-50 disabled:opacity-40"
        >
          ←
        </button>
        <button
          onClick={() =>
            setActiveIdx((prev) => Math.min(totalItems - 1, prev + 1))
          }
          disabled={activeIdx === totalItems - 1}
          className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-md text-lg hover:bg-slate-50 disabled:opacity-40"
        >
          →
        </button>
      </footer>
    </div>
  );
};

export default TestimonialSlider;
