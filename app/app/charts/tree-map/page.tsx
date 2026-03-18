"use client";

import React, { useMemo } from "react";
import TreeMap, { TreeItem } from "@/app/components/charts/TreeMap";

const BUDGET_DATA: TreeItem[] = [
  {
    id: "eng",
    label: "Engineering",
    value: 1200,
    colorValue: 85,
    children: [
      { id: "infra", label: "Cloud Infra", value: 500, colorValue: 95 },
      { id: "frontend", label: "Frontend", value: 300, colorValue: 60 },
      { id: "backend", label: "Backend API", value: 250, colorValue: 75 },
      { id: "mobile", label: "Mobile Apps", value: 150, colorValue: 40 },
    ],
  },
  {
    id: "mkt",
    label: "Marketing",
    value: 900,
    colorValue: 45,
    children: [
      { id: "paid", label: "Paid Search", value: 450, colorValue: 30 },
      { id: "seo", label: "SEO Content", value: 250, colorValue: 70 },
      { id: "social", label: "Social Media", value: 200, colorValue: 55 },
    ],
  },
  {
    id: "ops",
    label: "Operations",
    value: 650,
    colorValue: 50,
    children: [
      { id: "rent", label: "Office Rent", value: 350, colorValue: 15 },
      { id: "hardware", label: "IT Assets", value: 150, colorValue: 80 },
      { id: "logistics", label: "Supply Chain", value: 150, colorValue: 45 },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    value: 550,
    colorValue: 65,
    children: [
      { id: "us_sales", label: "North America", value: 300, colorValue: 75 },
      { id: "eu_sales", label: "Europe/EMEA", value: 250, colorValue: 50 },
    ],
  },
  {
    id: "rd",
    label: "R&D",
    value: 400,
    colorValue: 90,
    children: [
      { id: "ai", label: "AI Research", value: 250, colorValue: 98 },
      { id: "proto", label: "Prototyping", value: 150, colorValue: 60 },
    ],
  },
  {
    id: "hr",
    label: "Human Resources",
    value: 300,
    colorValue: 30,
    children: [
      { id: "recruiting", label: "Recruiting", value: 200, colorValue: 40 },
      { id: "benefits", label: "Benefits", value: 100, colorValue: 20 },
    ],
  },
  {
    id: "security",
    label: "Security",
    value: 320,
    colorValue: 92,
    children: [
      { id: "cyber", label: "Cyber Defense", value: 220, colorValue: 95 },
      { id: "physical", label: "Physical Sec", value: 100, colorValue: 60 },
    ],
  },
  {
    id: "support",
    label: "Support",
    value: 280,
    colorValue: 40,
    children: [
      { id: "customer", label: "Customer Care", value: 180, colorValue: 50 },
      { id: "technical", label: "Technical Sup", value: 100, colorValue: 30 },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    value: 200,
    colorValue: 25,
    children: [
      { id: "compliance", label: "Compliance", value: 120, colorValue: 35 },
      { id: "ip", label: "IP/Patents", value: 80, colorValue: 15 },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    value: 180,
    colorValue: 20,
    children: [
      { id: "accounting", label: "Accounting", value: 100, colorValue: 25 },
      { id: "tax", label: "Tax/Audit", value: 80, colorValue: 10 },
    ],
  },
];

export default function ResourcePage() {
  const chartData = useMemo(() => BUDGET_DATA, []);

  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <div className="w-full max-w-5xl ev-flex ev-flex-col ev-gap-lg">
        <TreeMap data={chartData} />
      </div>
    </main>
  );
}
