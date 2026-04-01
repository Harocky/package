"use client";

import AreaChart from "@/app/components/charts/AreaChart";
import GaugeChart from "@/app/components/charts/GaugeChart";
import MultiLineChart from "@/app/components/charts/MultiLineChart";
import PieChart, { PieData } from "@/app/components/charts/PieChart";
import BarChart, { BarData } from "@/app/components/charts/BarChart";
import LineChart, { DataPoint } from "@/app/components/charts/LineChart";
import LollipopChart, {
  LollipopData,
} from "@/app/components/charts/LollipopChart";
import ParetoChart, { ParetoData } from "@/app/components/charts/ParetoChart";
import Sparkline, { SparkPoint } from "@/app/components/charts/Sparkline";
import EvTable, { EvTableColumn } from "@/app/components/ui/EvTable";
import { useMemo } from "react";

type Metric = {
  label: string;
  value: number;
};

type Session = {
  id: string;
  user: string;
  charger: string;
  energy: number;
  cost: number;
  duration: number;
  status: "charging" | "stopped";
};

type Alert = {
  id: string;
  message: string;
  type: "critical" | "warning";
  timestamp: Date;
};

const RAW_SPARK_DATA: SparkPoint[] = [
  { date: "1", sales: 20, users: 15 },
  { date: "2", sales: 35, users: 22 },
  { date: "3", sales: 28, users: 18 },
  { date: "4", sales: 45, users: 30 },
  { date: "5", sales: 40, users: 26 },
  { date: "6", sales: 55, users: 38 },
  { date: "7", sales: 50, users: 34 },
];

const RAW_BUDGET_DATA: PieData[] = [
  { category: "Charging Revenue", percentage: 40 },
  { category: "Wallet Top-ups", percentage: 25 },
  { category: "Subscriptions", percentage: 15 },
  { category: "Penalties", percentage: 10 },
  { category: "Others", percentage: 10 },
];

const RAW_BAR_DATA: BarData[] = [
  { category: "Jan", q1: 120, q2: 90, q3: 60 },
  { category: "Feb", q1: 150, q2: 110, q3: 80 },
  { category: "Mar", q1: 180, q2: 140, q3: 100 },
  { category: "Apr", q1: 200, q2: 160, q3: 120 },
  { category: "May", q1: 240, q2: 190, q3: 150 },
  { category: "Jun", q1: 280, q2: 220, q3: 180 },
];

const RAW_LINE_DATA: DataPoint[] = Array.from({ length: 60 }).map((_, i) => ({
  date: `Day ${i + 1}`,
  availability: parseFloat((85 + Math.random() * 10).toFixed(2)),
}));

const RAW_LOLLIPOP_DATA: LollipopData[] = [
  { category: "Fast Chargers", value: 120 },
  { category: "AC Chargers", value: 200 },
  { category: "DC Chargers", value: 150 },
  { category: "Busy Chargers", value: 90 },
  { category: "Available Chargers", value: 180 },
  { category: "Offline Chargers", value: 40 },
];

const RAW_PARETO_DATA: ParetoData[] = [
  { category: "Low Wallet Balance", value: 180 },
  { category: "Charger Busy", value: 120 },
  { category: "OTP Failure", value: 60 },
  { category: "Payment Failure", value: 40 },
  { category: "Network Issues", value: 30 },
  { category: "Session Timeout", value: 15 },
];

const NOW = new Date();

const ALERTS: Alert[] = [
  {
    id: "1",
    message: "Charger Offline",
    type: "critical",
    timestamp: new Date(NOW.getTime() - 2 * 60 * 1000),
  },
  {
    id: "2",
    message: "Wallet Balance Low",
    type: "warning",
    timestamp: new Date(NOW.getTime() - 60 * 60 * 1000),
  },
  {
    id: "3",
    message: "Charging Stopped - Low Balance",
    type: "critical",
    timestamp: new Date(NOW.getTime() - 5 * 60 * 60 * 1000),
  },
  {
    id: "4",
    message: "OTP Delivery Delay",
    type: "warning",
    timestamp: new Date(NOW.getTime() - 24 * 60 * 60 * 1000),
  },
];

export default function Page() {
  const sparkData = useMemo(() => RAW_SPARK_DATA, []);

  const metrics: Metric[] = [
    { label: "Total Users", value: 18450 },
    { label: "Active Sessions", value: 382 },
    { label: "Active Chargers", value: 126 },
  ];

  const sessions: Session[] = [
    {
      id: "EV-1000",
      user: "User 1",
      charger: "Station-1",
      energy: 32,
      cost: 220,
      duration: 25,
      status: "charging",
    },
    {
      id: "EV-1001",
      user: "User 2",
      charger: "Station-2",
      energy: 18,
      cost: 140,
      duration: 15,
      status: "stopped",
    },
    {
      id: "EV-1002",
      user: "User 3",
      charger: "Station-3",
      energy: 45,
      cost: 380,
      duration: 40,
      status: "charging",
    },
    {
      id: "EV-1003",
      user: "User 4",
      charger: "Station-4",
      energy: 22,
      cost: 200,
      duration: 20,
      status: "charging",
    },
    {
      id: "EV-1004",
      user: "User 5",
      charger: "Station-5",
      energy: 12,
      cost: 120,
      duration: 12,
      status: "stopped",
    },
    {
      id: "EV-1005",
      user: "User 6",
      charger: "Station-6",
      energy: 38,
      cost: 300,
      duration: 35,
      status: "charging",
    },
  ];

  const SESSION_COLUMNS: EvTableColumn<Session>[] = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "charger", label: "Charger" },
    { key: "energy", label: "Energy (kWh)", type: "number" },
    { key: "cost", label: "Cost (₹)", type: "number" },
    { key: "duration", label: "Duration (min)", type: "number" },
    { key: "status", label: "Status" },
  ];

  function formatGroup(date: Date) {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString();
  }

  const groupedAlerts = ALERTS.reduce(
    (acc, alert) => {
      const group = formatGroup(alert.timestamp);
      if (!acc[group]) acc[group] = [];
      acc[group].push(alert);
      return acc;
    },
    {} as Record<string, Alert[]>,
  );

  const areaData = Array.from({ length: 30 }).map((_, i) => ({
    date: `Day ${i + 1}`,
    mobile: 20 + i,
    desktop: 15 + i,
    tablet: 10 + i,
  }));

  const multiData = Array.from({ length: 30 }).map((_, i) => ({
    date: `Day ${i + 1}`,
    sales: 100 + i * 5,
    users: 50 + i * 3,
    profit: 30 + i * 2,
  }));

  const gaugeMetrics = [
    {
      label: "Utilization",
      value: 78,
      min: 0,
      max: 100,
      unit: "%",
      color: "#10b981",
    },
  ];

  return (
    <div className="ev-pad-lg ev-bg-main ev-flex ev-flex-col ev-gap-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ev-gap-md">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="ev-bg-main ev-rounded-xl ev-shadow-md ev-pad-md ev-flex ev-justify-between ev-items-center"
          >
            <div className="ev-flex ev-flex-col">
              <span className="text-sm text-gray-500">{m.label}</span>
              <span className="text-xl font-bold">{m.value}</span>
            </div>

            {(m.label === "Total Users" || m.label === "Active Sessions") && (
              <Sparkline
                data={sparkData}
                metric={m.label === "Total Users" ? "users" : "sales"}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ev-gap-lg items-center">
        <AreaChart data={areaData} />
        <MultiLineChart data={multiData} />
        <PieChart data={RAW_BUDGET_DATA} />
        <BarChart data={RAW_BAR_DATA} />
        <LineChart data={RAW_LINE_DATA} />
        <LollipopChart data={RAW_LOLLIPOP_DATA} />
        <ParetoChart data={RAW_PARETO_DATA} />
        <GaugeChart metrics={gaugeMetrics} />

        <div className="w-full h-full ev-bg-main ev-rounded-xl ev-shadow-md ev-pad-md ev-border ev-flex ev-flex-col">
          <div className="font-semibold">Alerts</div>

          <div className="flex-1 overflow-y-auto ev-flex ev-flex-col ev-gap-md">
            {Object.entries(groupedAlerts).map(([group, items]) => (
              <div key={group} className="ev-flex ev-flex-col ev-gap-xs">
                <div className="text-xs text-gray-400 font-semibold uppercase">
                  {group}
                </div>

                {items.map((a) => (
                  <div
                    key={a.id}
                    className={`ev-pad-sm ev-rounded-md ${
                      a.type === "critical"
                        ? "bg-red-50 text-red-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {a.message}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <EvTable data={sessions} columns={SESSION_COLUMNS} />
    </div>
  );
}
