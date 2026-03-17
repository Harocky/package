"use client";

type Item = {
  title: string;
  content: string;
};

type Props = {
  items: Item[];
  openIndex: number | null;
  onToggle: (index: number) => void;
};

export default function EvAccordion({ items, openIndex, onToggle }: Props) {
  return (
    <div className="ev-accordion-wrapper">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="ev-accordion-item ev-shadow-sm">
            <button
              className={`ev-accordion-header ${isOpen ? "is-open" : ""}`}
              onClick={() => onToggle(index)}
            >
              <span
                className={`ev-text-md ev-font-semibold transition-colors duration-200 ${
                  isOpen ? "ev-text-primary" : "ev-text-main"
                }`}
              >
                {item.title}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ev-accordion-icon ${isOpen ? "is-open" : ""}`}
                style={{
                  width: "var(--ev-icon-sm)",
                  height: "var(--ev-icon-sm)",
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div className={`ev-accordion-content ${isOpen ? "is-open" : ""}`}>
              <div className="ev-accordion-inner">
                <div
                  className="ev-text-md ev-text-muted ev-bg-soft"
                  style={{
                    padding:
                      "var(--ev-space-sm) var(--ev-space-md) var(--ev-space-md) var(--ev-space-md)",
                    borderTop: "1px solid var(--ev-border)",
                  }}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
