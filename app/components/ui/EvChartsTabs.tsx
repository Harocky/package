"use client";

import { usePathname, useRouter } from "next/navigation";
import EvTabs from "./EvTabs";

export default function ChartsTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const TABS = [
    { id: "/app/charts/area-chart", label: "Area Chart" },
    { id: "/app/charts/bar-chart", label: "Bar Chart" },
    { id: "/app/charts/box-plot", label: "Box Plot" },
    { id: "/app/charts/bubble-chart", label: "Bubble Chart" },
    { id: "/app/charts/chropleth-map", label: "Choropleth Map" },
    { id: "/app/charts/funnel-chart", label: "Funnel Chart" },
    { id: "/app/charts/guage-chart", label: "Gauge Chart" },
    { id: "/app/charts/heat-map", label: "Heat Map" },
    { id: "/app/charts/hierarchy", label: "Hierarchy" },
    { id: "/app/charts/histogram", label: "Histogram" },
    { id: "/app/charts/line-chart", label: "Line Chart" },
    { id: "/app/charts/lollipop", label: "Lollipop Chart" },
    { id: "/app/charts/multi-line-chart", label: "Multi-Line Chart" },
    { id: "/app/charts/pareto", label: "Pareto Chart" },
    { id: "/app/charts/pie-chart", label: "Pie Chart" },
    { id: "/app/charts/radar-chart", label: "Radar Chart" },
    { id: "/app/charts/sankey-chart", label: "Sankey Chart" },
    { id: "/app/charts/scatter-plot", label: "Scatter Plot" },
    { id: "/app/charts/sparkline", label: "Sparkline" },
    { id: "/app/charts/tree-map", label: "Tree Map" },
  ];

  return (
    <div className="w-full max-w-7xl">
      <EvTabs
        tabs={TABS}
        activeTab={pathname}
        onChange={(route) => router.push(route)}
      />
    </div>
  );
}
