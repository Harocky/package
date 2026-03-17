"use client";

import EvButton from "../../components/ui/EvButton";

export default function Page() {
  return (
    <main className="min-h-screen ev-flex ev-items-center ev-justify-center">
      <div className="ev-flex ev-gap-md">
        <EvButton
          text="Primary Action"
          variant="primary"
          onClick={() => alert("Primary Clicked")}
        />

        <EvButton
          text="Secondary Action"
          variant="secondary"
          onClick={() => alert("Secondary Clicked")}
        />

        <EvButton variant="primary" disabled onClick={() => {}}>
          Disabled
        </EvButton>
      </div>
    </main>
  );
}
