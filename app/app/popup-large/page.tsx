"use client";

import { useState } from "react";
import EvButton from "../../components/ui/EvButton";
import EvPopupLarge from "../../components/ui/EvPopupLarge";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-2xl">
      <EvButton
        text="Edit Project Details"
        variant="primary"
        onClick={() => setOpen(true)}
      />

      <EvPopupLarge
        open={open}
        title="Project Configuration"
        onClose={() => setOpen(false)}
        onConfirm={() => alert("Settings Updated")}
      >
        <div className="ev-flex ev-flex-col ev-gap-md">
          <h2 className="ev-text-xl ev-font-bold ev-text-primary">
            System Parameters
          </h2>
          <p>
            This large modal can host complex forms, tables, or long-form
            documentation.
          </p>

          {/* Mock content to trigger scroll */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="ev-pad-md ev-bg-alt ev-rounded-md ev-border"
            >
              Parameter Row {i + 1}: Configuration value set to default.
            </div>
          ))}
        </div>
      </EvPopupLarge>
    </main>
  );
}
