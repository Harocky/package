"use client";

import Image from "next/image";
import React, { useState } from "react";

export type EvFlexCardData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon?: React.ReactNode;
};

export default function EvFlexCards({ data }: { data: EvFlexCardData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-6xl h-[500px] ev-flex flex-col md:flex-row ev-gap-sm overflow-hidden ev-pad-md ev-bg-alt rounded-3xl">
      {data.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={item.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-1500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group"
            style={{ flex: isActive ? 5 : 1 }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={item.image}
              alt={item.title}
              height={1000}
              width={1000}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isActive
                  ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100"
                  : "bg-black/40 opacity-100"
              }`}
            />

            <div className="absolute inset-0 ev-pad-md">
              <div className="relative w-full h-full">
                {item.icon && (
                  <div
                    className={`ev-flex ev-items-center ev-justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-500 ev-pad-sm absolute ${
                      isActive
                        ? "bottom-20 left-0 translate-y-0 rotate-0"
                        : "bottom-10 left-2 -rotate-90"
                    }`}
                  >
                    {item.icon}
                  </div>
                )}

                <h3
                  className={`text-white font-bold text-2xl transition-all duration-1000 origin-left absolute whitespace-nowrap ${
                    isActive
                      ? "opacity-100 translate-y-0 scale-100 rotate-0 left-0 bottom-10"
                      : "opacity-100 -rotate-90 left-2 bottom-10"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-gray-200 text-sm overflow-hidden transition-all duration-500 delay-100 absolute left-0 bottom-0 ${
                    isActive
                      ? "opacity-100 max-h-20 translate-y-0"
                      : "opacity-0 max-h-0 translate-y-4"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
