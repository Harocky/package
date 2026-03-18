"use client";

import HierarchyChart from "@/app/components/charts/Hierarchy";

const DATA = {
  id: "root",
  label: "Enterprise",
  children: [
    {
      id: "Product",
      label: "PROD",
      color: "#6366f1",
      children: [
        {
          id: "Software",
          label: "SW",
          children: [
            {
              id: "Frontend",
              label: "FE",
              children: [
                {
                  id: "React Stack",
                  label: "RCT",
                  children: [
                    { id: "Hooks", label: "HKS", value: 60 },
                    { id: "Suspense", label: "SUS", value: 40 },
                  ],
                },
                { id: "Next.js", label: "NXT", value: 150 },
              ],
            },
            { id: "Backend", label: "BE", value: 180 },
          ],
        },
      ],
    },
    {
      id: "Marketing",
      label: "MKT",
      color: "#10b981",
      children: [
        {
          id: "Digital",
          label: "DIG",
          children: [
            {
              id: "Social",
              label: "SOC",
              children: [
                {
                  id: "Paid Ads",
                  label: "ADS",
                  children: [
                    { id: "Search", label: "SEA", value: 200 },
                    { id: "Display", label: "DSP", value: 100 },
                  ],
                },
                { id: "Organic", label: "ORG", value: 110 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "Finance",
      label: "FIN",
      color: "#f59e0b",
      children: [
        {
          id: "Investment",
          label: "INV",
          children: [
            {
              id: "Equity",
              label: "EQ",
              children: [
                {
                  id: "Public",
                  label: "PUB",
                  children: [
                    { id: "Stocks", label: "STK", value: 300 },
                    { id: "Bonds", label: "BND", value: 150 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export default function Page() {
  return (
    <div className="min-h-screen ev-bg-main ev-pad-xl ev-flex ev-justify-center ev-items-center">
      <HierarchyChart data={DATA} />
    </div>
  );
}
