"use client";

import { useState } from "react";
import EvTextarea from "@/app/components/ui/EvTextArea";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | undefined>();

  function handleChangeFirstName(value: string) {
    setFirstName(value);
    setFirstNameError(
      value.length < 3 ? "Minimum 3 characters required" : undefined,
    );
  }

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-flex-col ev-items-center ev-justify-center ev-pad-md ev-gap-sm">
      <EvTextarea
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        error={firstNameError}
        onChange={handleChangeFirstName}
        className="max-w-fit"
      />

      <button className="ev-btn ev-btn-primary">Save Profile</button>
    </main>
  );
}
