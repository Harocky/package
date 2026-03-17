"use client";

import EvCheckbox from "../../components/ui/EvCheckbox";
import { useState } from "react";

export default function CheckboxDemoPage() {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!agree) {
      setError("You must accept the terms.");
      return;
    }

    setError("");
    alert("Form submitted!");
  };

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-md">
      <div className="ev-flex ev-flex-col ev-gap-lg ev-pad-md w-full border border-gray-100">
        <EvCheckbox
          label="I agree to the Terms and Conditions"
          checked={agree}
          error={error}
          onChange={(v) => {
            setAgree(v);
            if (v) setError("");
          }}
        />

        <button
          className="ev-btn ev-btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
