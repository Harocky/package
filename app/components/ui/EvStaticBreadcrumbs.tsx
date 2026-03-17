"use client";

type Item = {
  label: string;
  href?: string;
};

type Props = {
  items: Item[];
  onNavigate?: (href: string) => void;
};

export default function EvStaticBreadcrumbs({
  items,
  onNavigate,
}: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="ev-flex ev-items-center ev-gap-sm ev-text-md"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="ev-flex ev-items-center ev-gap-sm">
            {!isLast ? (
              <button
                type="button"
                className="ev-link ev-font-medium"
                onClick={() => item.href && onNavigate?.(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <span
                className="ev-text-muted ev-font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span className="ev-text-muted ev-font-normal select-none">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
