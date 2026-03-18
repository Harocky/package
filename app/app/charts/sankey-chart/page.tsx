"use client";

import React, { useMemo } from "react";
import SankeyChart, { SankeyData } from "@/app/components/charts/SankeyChart";

const MULTI_STAGE_FLOW: SankeyData = {
  nodes: [
    { id: "market_res", name: "Market Research", column: 0 },
    { id: "user_feed", name: "User Feedback", column: 0 },
    { id: "vc_fund", name: "VC Funding", column: 0 },
    { id: "dept_design", name: "Design", column: 1 },
    { id: "dept_eng", name: "Engineering", column: 1 },
    { id: "dept_qa", name: "Quality Assurance", column: 1 },
    { id: "stage_mvp", name: "MVP Release", column: 2 },
    { id: "stage_beta", name: "Beta Program", column: 2 },
    { id: "stage_prod", name: "Production", column: 2 },
    { id: "out_ios", name: "iOS Store", column: 3 },
    { id: "out_web", name: "Web App", column: 3 },
    { id: "out_android", name: "Android Store", column: 3 },
  ],
  links: [
    { source: "market_res", target: "dept_design", value: 600 },
    { source: "user_feed", target: "dept_design", value: 400 },
    { source: "vc_fund", target: "dept_eng", value: 1200 },
    { source: "vc_fund", target: "dept_qa", value: 300 },
    { source: "dept_design", target: "stage_mvp", value: 700 },
    { source: "dept_design", target: "stage_beta", value: 300 },
    { source: "dept_eng", target: "stage_prod", value: 1200 },
    { source: "dept_qa", target: "stage_prod", value: 300 },
    { source: "stage_mvp", target: "out_web", value: 700 },
    { source: "stage_beta", target: "out_ios", value: 300 },
    { source: "stage_prod", target: "out_ios", value: 400 },
    { source: "stage_prod", target: "out_web", value: 600 },
    { source: "stage_prod", target: "out_android", value: 500 },
  ],
};

export default function SankeyPage() {
  const chartData = useMemo(() => MULTI_STAGE_FLOW, []);
  return (
    <main className="ev-bg-main min-h-screen ev-pad-lg ev-flex ev-flex-col ev-items-center">
      <SankeyChart data={chartData} />
    </main>
  );
}
