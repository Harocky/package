"use client";

import { useState } from "react";
import EvSubmitButton from "../../components/ui/EvSubmitButton";

export default function Page() {
  const [blockButtons, setBlockButtons] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [publishLoading, setPublishLoading] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  async function simulateAction(
    setLoading: (v: boolean) => void,
    setSuccess: (v: boolean) => void,
  ) {
    if (blockButtons) return;

    setBlockButtons(true);
    setLoading(true);
    setSuccess(false);

    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setSuccess(true);
    setBlockButtons(false);

    // Reset Success state after a delay
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-md ev-gap-md">
        <EvSubmitButton
          text="Save Changes"
          successText="Saved!"
          variant="primary"
          loading={saveLoading}
          success={saveSuccess}
          block={blockButtons}
          onClick={() => simulateAction(setSaveLoading, setSaveSuccess)}
        />

        <EvSubmitButton
          text="Publish"
          successText="Published!"
          variant="secondary"
          loading={publishLoading}
          success={publishSuccess}
          block={blockButtons}
          onClick={() => simulateAction(setPublishLoading, setPublishSuccess)}
        />
    </main>
  );
}
