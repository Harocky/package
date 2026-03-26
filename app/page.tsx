"use client";
import { useEffect, useRef } from "react";
import EvButton from "./components/ui/EvButton";
import Image from "next/image";

const features = [
  {
    title: "Secure Identity & Access",
    content:
      "Register using your phone number with OTP verification and create a secure 4-digit MPIN to protect your account. [cite: 5, 12, 88]",
    buttonText: "Get Started",
    bgColor: "bg-slate-900",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Smart Wallet Payments",
    content:
      "Enjoy seamless charging with real-time wallet deductions and automated session stops if your balance is low. [cite: 679, 743, 997]",
    buttonText: "Manage Wallet",
    bgColor: "bg-emerald-50",
    textColor: "text-slate-900",
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Advanced Station Search",
    content:
      "Locate nearby chargers via GPS, view real-time connector availability, and monitor charging progress live. [cite: 1081, 1141, 1356]",
    buttonText: "Find Chargers",
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
              .querySelectorAll(".reveal, .zoomImage, .fadeSlide")
              .forEach((el) => el.classList.add("active"));
          }
        });
      },
      { threshold: 0.2 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full overflow-hidden">
      {features.map((feature, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className={`min-h-[95vh] w-full flex items-center ${feature.bgColor}`}
        >
          {/* Full-width grid structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-10 ev-pad-xl">
            {/* Contained Image Section */}
            <div
              className={`flex justify-center items-center w-full px-8 lg:px-20 ${index % 2 === 0 ? "lg:order-first" : "lg:order-last"}`}
            >
              <div className="relative w-full group">
                <div className="zoomImage uniqueImageShape overflow-hidden aspect-[4/3] lg:aspect-square w-full relative z-0 shadow-2xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-2xl"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>

            {/* Centered Content Section */}
            <div className="flex flex-col justify-center items-center w-full px-8 lg:px-20">
              <div
                className={`w-full flex flex-col gap-10 text-center lg:text-left ${feature.textColor}`}
              >
                <h2
                  className="reveal font-bold leading-tight"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                  {feature.title}
                </h2>

                <p
                  className="fadeSlide opacity-90 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
                >
                  {feature.content}
                </p>

                <div className="reveal">
                  <EvButton
                    text={feature.buttonText}
                    variant="secondary"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
