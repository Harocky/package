"use client";

import { useState } from "react";
import EvButton from "../../components/ui/EvButton";
import EvPopupConfirm from "../../components/ui/EvPopupConfirm";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-2xl">
        <EvButton
          text="Delete Account"
          variant="secondary"
          className="hover:!text-red-500 hover:!border-red-500"
          onClick={() => setOpen(true)}
        />

      <EvPopupConfirm
        open={open}
        title="Delete Permanently?"
        text="This action cannot be undone. All your data will be removed from our servers immediately."
        onClose={() => setOpen(false)}
        onConfirm={() => alert("Data Deleted.")}
      />
    </main>
  );
}
