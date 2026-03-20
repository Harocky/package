"use client";

import Image from "next/image";
import React, { useState } from "react";

export type EvExpandableCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  image?: string;
};

export default function EvExpandableCard({
  title,
  subtitle,
  children,
  actionButton,
  image,
}: EvExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="ev-bg-main rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md w-full max-w-2xl">
      <div
        className="ev-flex ev-items-center ev-justify-between ev-pad-md cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="ev-flex ev-items-center ev-gap-md">
          {image && (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src={image}
                alt={title}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="ev-flex ev-flex-col">
            <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          </div>
        </div>
        <div
          className={`transform transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ev-pad-md ev-pad-t-xs border-t border-gray-50">
            <div className="text-gray-600 text-sm leading-relaxed ev-mar-b-md">
              {children}
            </div>
            {actionButton && (
              <div className="ev-flex ev-justify-end">{actionButton}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
