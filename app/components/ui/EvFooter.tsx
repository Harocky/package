"use client";

import { useRouter, usePathname } from "next/navigation";

export default function EvFooter() {
  const router = useRouter();
  const pathname = usePathname();

  const handleContactClick = () => {
    if (pathname === "/") {
      const section = document.getElementById("contact-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#contact-section");
    }
  };

  const socialLinks = [
    { emoji: "💬", href: "https://wa.me/yournumber", label: "WhatsApp" },
    { emoji: "📸", href: "https://instagram.com/marsev", label: "Instagram" },
    { emoji: "🐦", href: "https://twitter.com/marsev", label: "Twitter" },
    {
      emoji: "💼",
      href: "https://linkedin.com/company/marsev",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="relative w-full ev-pad-lg ev-flex-col text-white"
      style={{
        backgroundImage:
          'linear-gradient(rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.98)), url("https://ev-a2z.com/wp-content/uploads/2022/05/Front-view-electric-car-silhouette-with-green-glowing-on-dark-background.-EV-concept.-Vector-illustration-e1674284855247.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="ev-flex ev-justify-between ev-items-start ev-pad-x-xl ev-gap-xl">
        {/* BRAND COLUMN */}
        <div className="ev-flex-col ev-gap-md" style={{ maxWidth: "320px" }}>
          <div
            className="ev-flex-col ev-gap-xs ev-cursor-pointer"
            onClick={() => router.push("/")}
          >
            {/* EV LOGO MARK (No Image/Package) */}
            <div
              className="ev-flex ev-items-center ev-justify-center ev-rounded-full ev-bg-primary ev-mar-b-xs"
              style={{
                width: "48px",
                height: "48px",
                fontWeight: 900,
                fontSize: "1.2rem",
                border: "2px solid #34d399",
              }}
            >
              EV
            </div>

            <div
              className="ev-font-bold"
              style={{ fontSize: "1.5rem", letterSpacing: "1px" }}
            >
              MARS <span style={{ color: "#34d399" }}>EV</span>
            </div>

            {/* SLOGAN */}
            <p
              className="ev-text-sm ev-font-semibold"
              style={{ color: "#34d399", opacity: 0.9 }}
            >
              Powering the Red Planet.
            </p>
          </div>

          {/* DESCRIPTION / MOTTO */}
          <p className="ev-text-sm leading-relaxed" style={{ opacity: 0.6 }}>
            The premier platform for sustainable interplanetary transportation.
            Believe in a future that is better than the past.
          </p>

          {/* SOCIAL MEDIA EMOJIS */}
          <div className="ev-flex ev-flex-row ev-gap-md ev-mar-t-xs">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ev-transition hover:scale-125"
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  filter: "grayscale(0.3)", // Subtle look to match theme
                }}
                title={social.label}
              >
                {social.emoji}
              </a>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="ev-flex ev-gap-xl ev-mar-t-sm">
          <div className="ev-flex-col ev-gap-sm">
            <span
              className="ev-font-bold ev-mar-b-xs"
              style={{ color: "#34d399" }}
            >
              LEGAL
            </span>
            <button
              onClick={() => router.push("/terms-and-conditions")}
              className="ev-cursor-pointer ev-justify-start ev-transition hover:opacity-50 text-white"
            >
              Terms
            </button>
            <button
              onClick={() => router.push("/privacy-policy")}
              className="ev-cursor-pointer ev-justify-start ev-transition hover:opacity-50 text-white"
            >
              Privacy
            </button>
          </div>

          <div className="ev-flex-col ev-gap-sm">
            <span
              className="ev-font-bold ev-mar-b-xs"
              style={{ color: "#34d399" }}
            >
              SUPPORT
            </span>
            <button
              onClick={handleContactClick}
              className="ev-cursor-pointer ev-justify-start ev-transition ev-font-bold hover:opacity-50 text-white"
            >
              Contact Us
            </button>
            <span className="ev-text-sm" style={{ opacity: 0.6 }}>
              info@marsev.com
            </span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className="ev-mar-t-xl ev-pad-t-md ev-flex ev-justify-center w-full"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="ev-text-sm" style={{ opacity: 0.4 }}>
          © 2026 Mars EV Inc. | Pioneering Sustainable Interstellar Travel
        </p>
      </div>
    </footer>
  );
}
