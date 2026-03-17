"use client";

import { useState } from "react";
import EvAccordion from "../../components/ui/EvAccordion";

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "React",
      content:
        "React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. React is a JavaScript library for building UI. ",
    },
    {
      title: "Next.js",
      content: "Next.js is a React framework for production apps.",
    },
    {
      title: "TypeScript",
      content: "TypeScript adds static typing to JavaScript.",
    },
  ];

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <main className="min-h-screen ev-bg-soft ev-pad-2xl ev-flex ev-items-center ev-justify-center">
      <EvAccordion items={items} openIndex={openIndex} onToggle={toggle} />
    </main>
  );
}
