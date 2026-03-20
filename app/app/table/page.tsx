"use client";

import EvTable, { EvTableColumn } from "@/app/components/ui/EvTable";

type StationData = {
  id: string;
  stationName: string;
  status: string;
  powerKw: number;
  lastMaintained: string;
};

const MOCK_DATA: StationData[] = [
  {
    id: "ST-001",
    stationName: "Alpha Hub North",
    status: "Active",
    powerKw: 350,
    lastMaintained: "2026-03-01",
  },
  {
    id: "ST-002",
    stationName: "Omega City Center",
    status: "Offline",
    powerKw: 150,
    lastMaintained: "2026-02-15",
  },
  {
    id: "ST-003",
    stationName: "Beta Plaza",
    status: "Active",
    powerKw: 50,
    lastMaintained: "2026-03-10",
  },
  {
    id: "ST-004",
    stationName: "Gamma Highway Stop",
    status: "Maintenance",
    powerKw: 350,
    lastMaintained: "2026-03-18",
  },
  {
    id: "ST-005",
    stationName: "Delta Mall Parking",
    status: "Active",
    powerKw: 150,
    lastMaintained: "2026-01-20",
  },
];

const COLUMNS: EvTableColumn<StationData>[] = [
  { key: "id", label: "Station ID" },
  { key: "stationName", label: "Location Name" },
  { key: "status", label: "Current Status" },
  { key: "powerKw", label: "Output (kW)", type: "number" },
  { key: "lastMaintained", label: "Last Serviced", type: "date" },
];

export default function Page() {
  return (
    <main className="min-h-screen ev-bg-alt ev-pad-xl ev-flex ev-flex-col ev-items-center">
      <div className="w-full">
        <EvTable data={MOCK_DATA} columns={COLUMNS} />
      </div>
    </main>
  );
}
