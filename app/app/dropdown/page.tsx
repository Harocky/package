"use client";

import { useState } from "react";
import EvDropdown from "../../components/ui/EvDropdown";

export default function DropdownDemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState("");

  const categories = [
    { label: "Software Engineering", value: "eng" },
    { label: "Product Management", value: "pm" },
    { label: "Design & Creative", value: "design" },
    { label: "Marketing & Growth", value: "marketing" },
    { label: "Data Science & AI", value: "data" },
  ];

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    setError(""); // Clear error on selection
  };

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-md">
      <div className="ev-flex ev-flex-col ev-gap-lg w-fit">
        <div className="ev-flex ev-flex-col ev-gap-md">
          <EvDropdown
            open={isOpen}
            options={categories}
            selected={selectedCategory}
            placeholder="Select a department..."
            error={error}
            onToggle={() => setIsOpen(!isOpen)}
            onClose={() => setIsOpen(false)}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </main>
  );
}
