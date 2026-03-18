"use client";

import React from "react";

type Tab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type EvTabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
};

export default function EvTabs({ tabs, activeTab, onChange }: EvTabsProps) {
  return (
    <div className="ev-flex ev-flex-wrap ev-justify-center ev-gap-xs ev-bg-alt ev-pad-xs ev-rounded-lg border border-gray-100 w-full max-w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`ev-flex ev-items-center ev-justify-center ev-gap-xs ev-pad-x-md ev-pad-y-sm ev-rounded-md ev-text-sm ev-font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-white text-indigo-600 shadow-sm border border-gray-100/50"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/50 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
