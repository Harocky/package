"use client";
import { useEffect, useRef } from "react";
import styles from "./EVFeatures.module.scss";

const features = [
  {
    title: "Secure Registration",
    content:
      "Register securely using your phone number with OTP verification and 4-digit MPIN setup.",
    buttonText: "Sign Up Now",
    bgColor: "bg-slate-900",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Digital Wallet",
    content:
      "Add money via online payment methods and track all charging-related deductions in real-time.",
    buttonText: "Manage Wallet",
    bgColor: "bg-emerald-50",
    textColor: "text-slate-900",
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Charger Discovery",
    content:
      "Locate nearby stations using GPS, view real-time availability, and connector types instantly.",
    buttonText: "Find Stations",
    bgColor: "bg-slate-800",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  },
];

export default function EVFeatures() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(
                `.${styles.reveal}, .${styles.zoomImage}, .${styles.fadeSlide}`,
              )
              .forEach((el) => el.classList.add(styles.active));
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full">
      {features.map((feature, index) => (
        <div
          key={index}
          // THE FIX: Wrapped in curly braces to return void
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className={`${styles.featureContainer} ${feature.bgColor} ${index % 2 !== 0 ? "flex-row-reverse" : "flex-row"} transition-colors duration-700`}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative overflow-hidden group">
              <div
                className={`${styles.zoomImage} ${styles.uniqueImageShape} overflow-hidden aspect-video lg:aspect-square`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Side */}
            <div
              className={`flex flex-col space-y-6 ${feature.textColor} text-center lg:text-left`}
            >
              <h2
                className={`${styles.reveal} font-bold leading-tight`}
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {feature.title}
              </h2>

              <p
                className={`${styles.fadeSlide} opacity-80 line-clamp-2`}
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
              >
                {feature.content}
              </p>

              <div className={styles.reveal}>
                <button className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 border-2 border-current hover:bg-white hover:text-black">
                  {feature.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
