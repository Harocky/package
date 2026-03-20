"use client";

import { useToast } from "@/app/components/ui/EvToast";

export default function ToastPage() {
  const { showToast } = useToast();

  return (
    <div className="ev-flex ev-gap-xl">
      <button
        className="ev-btn-secondary ev-btn"
        onClick={() =>
          showToast({
            title: "Success",
            description: "Your action was completed",
            emoji: "✅",
            type: "success",
          })
        }
      >
        Success
      </button>

      <button
        className="ev-btn-secondary ev-btn"
        onClick={() =>
          showToast({
            title: "Error",
            description: "Something went wrong",
            emoji: "❌",
            type: "error",
          })
        }
      >
        Error
      </button>

      <button
        className="ev-btn-secondary ev-btn"
        onClick={() =>
          showToast({
            title: "Warning",
            description: "Be careful with this action",
            emoji: "⚠️",
            type: "warning",
          })
        }
      >
        Warning
      </button>

      <button
        className="ev-btn-secondary ev-btn"
        onClick={() =>
          showToast({
            title: "Info",
            description: "Here is some information",
            emoji: "ℹ️",
            type: "info",
          })
        }
      >
        Info
      </button>
    </div>
  );
}
