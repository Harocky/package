"use client";

import { useState } from "react";
import EvInput from "../../components/ui/EvInput";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | undefined>();
  const [secondNameError, setSecondNameError] = useState<string | undefined>();

  function handleChangeFirstName(value: string) {
    setFirstName(value);
    setFirstNameError(
      value.length < 3 ? "Minimum 3 characters required" : undefined,
    );
  }

  function handleChangeSecondName(value: string) {
    setSecondName(value);
    if (value.length < 5) {
      setSecondNameError("Minimum 5 characters required");
    } else if (value.length > 7) {
      setSecondNameError("Maximum 7 characters required");
    } else {
      setSecondNameError(undefined);
    }
  }

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-flex-col ev-items-center ev-justify-center ev-pad-md ev-gap-sm">
      <EvInput
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        error={firstNameError}
        onChange={handleChangeFirstName}
        className="max-w-fit"
      />
      <EvInput
        label="Second Name"
        placeholder="Enter your second name"
        value={secondName}
        error={secondNameError}
        onChange={handleChangeSecondName}
        className="max-w-fit"
      />

      <button className="ev-btn ev-btn-primary">Save Profile</button>
    </main>
  );
}
