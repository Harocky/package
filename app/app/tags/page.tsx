"use client";

import EvTags from "@/app/components/ui/EvTags";

export default function Page() {
  const tags = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "SCSS",
    "4K Ready",
  ];

  return (
    <main className="ev-bg-soft min-h-screen ev-flex ev-items-center ev-justify-center ev-pad-md">
      <EvTags tags={tags} />
    </main>
  );
}
