"use client";

import WorldMap, { MapPin } from "@/app/components/charts/ChoroplethMap";
import React, { useMemo } from "react";
const SERVER_LOCATIONS: MapPin[] = [
  {
    id: "us_east",
    name: "New York Hub",
    value: 850,
    lat: 40.71,
    lng: -74.0,
    category: "Americas",
  },
  {
    id: "us_west",
    name: "SF Data Center",
    value: 920,
    lat: 37.77,
    lng: -122.41,
    category: "Americas",
  },
  {
    id: "eu_central",
    name: "Frankfurt Node",
    value: 1200,
    lat: 50.11,
    lng: 8.68,
    category: "Europe",
  },
  {
    id: "asia_south",
    name: "Mumbai Gateway",
    value: 750,
    lat: 19.07,
    lng: 72.87,
    category: "Asia",
  },
  {
    id: "asia_east",
    name: "Tokyo Edge",
    value: 1100,
    lat: 35.67,
    lng: 139.65,
    category: "Asia",
  },
  {
    id: "au_east",
    name: "Sydney Relay",
    value: 400,
    lat: -33.86,
    lng: 151.2,
    category: "Oceania",
  },
  {
    id: "sa_east",
    name: "São Paulo Node",
    value: 300,
    lat: -23.55,
    lng: -46.63,
    category: "Americas",
  },
];

export default function GlobalStatusPage() {
  const chartData = useMemo(() => SERVER_LOCATIONS, []);
  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <WorldMap data={chartData} />
    </main>
  );
}
