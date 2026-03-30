"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import EvFlexCards, { EvFlexCardData } from "@/app/components/ui/EvFlexCards";
import EvRoadmap, { RoadmapStep } from "@/app/components/ui/EvRoadmap";
import EvExpandableCard from "@/app/components/ui/EvExpandableCard";
import GaugeChart, { GaugeMetric } from "@/app/components/charts/GaugeChart";
import EvSubmitButton from "@/app/components/ui/EvSubmitButton";
import EvInput from "@/app/components/ui/EvInput";
import EvCheckbox from "@/app/components/ui/EvCheckbox";
import { useToast } from "@/app/components/ui/EvToast";
import EvButton from "@/app/components/ui/EvButton";

const IMG = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7";

const FEATURES_DATA = [
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

const SOLUTIONS: EvFlexCardData[] = [
  { id: "1", title: "Bolt.Lite", subtitle: "3.3kW IoT Charging.", image: IMG },
  {
    id: "2",
    title: "Bolt.Turbo",
    subtitle: "High-speed DC charging.",
    image: IMG,
  },
  {
    id: "3",
    title: "Enterprise",
    subtitle: "Fleet management hub.",
    image: IMG,
  },
];

const ROADMAP: RoadmapStep[] = [
  {
    title: "Grid Audit",
    desc: "Digital verification of local capacity.",
    icon: <span>📊</span>,
  },
  {
    title: "Site Twin",
    desc: "3D model for optimal placement.",
    icon: <span>🗺️</span>,
  },
  {
    title: "Rapid Install",
    desc: "Hardware deployed in < 60 mins.",
    icon: <span>🚧</span>,
  },
  {
    title: "OS Sync",
    desc: "Connecting to Earth Cloud.",
    icon: <span>⚡</span>,
  },
];

const METRICS: GaugeMetric[] = [
  {
    label: "Efficiency",
    value: 94,
    min: 0,
    max: 100,
    unit: "%",
    color: "#3b82f6",
  },
];

const UnifiedMarsEVPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { showToast } = useToast();
  const mainRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [battery, setBattery] = useState(60);
  const [power, setPower] = useState(50);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const time = useMemo(() => (battery / power).toFixed(1), [battery, power]);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);

    const handleScroll = () => {
      if (mainRef.current)
        mainRef.current.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Logic for the scrolling features
            entry.target
              .querySelectorAll(".reveal, .zoomImage, .fadeSlide")
              .forEach((el) => el.classList.add("active"));
          }
        });
      },
      { threshold: 0.2 },
    );

    // Observe standard data-animate elements
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    // Observe the specific scrolling feature sections
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="ev-bg-main ev-mar-auto w-full overflow-x-hidden"
    >
      {/* 1. MARS HERO */}
      <div
        className="relative ev-mar-t-lg ev-mar-x-md"
        style={{ height: "500px" }}
      >
        <div
          className="absolute right-[50px] bottom-[-150px] z-30 pointer-events-none ev-transition"
          style={{
            width: "450px",
            transitionDuration: "1500ms",
            opacity: isActive ? 1 : 0,
            filter: isActive ? "blur(0px)" : "blur(10px)",
            transform: isActive ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkf2vL5-ftKxB9Ro6nC9TWEY0uFbGg7y479Q&s"
            alt="Astronaut"
            className="w-full h-auto"
            width={450}
            height={450}
            priority
          />
        </div>

        <div
          className="relative w-full h-full ev-rounded-xl ev-shadow-lg z-10 overflow-hidden"
          style={{
            clipPath: "ellipse(150% 100% at 50% 0%)",
            backgroundImage:
              'url("https://ev-a2z.com/wp-content/uploads/2022/05/Front-view-electric-car-silhouette-with-green-glowing-on-dark-background.-EV-concept.-Vector-illustration-e1674284855247.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 2500ms ease-out",
            transform: isActive ? "scale(1)" : "scale(1.1)",
          }}
        >
          <div className="absolute inset-0 ev-pad-xl ev-flex ev-flex-col ev-justify-start text-white">
            <h1
              className="ev-transition"
              style={{
                fontSize: "3.75rem",
                fontWeight: 900,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(60px)",
              }}
            >
              Revealing the Treasures <br /> of the Universe
            </h1>
          </div>
        </div>
        <div
          className="absolute bottom-[-8px] left-0 w-full h-20 ev-bg-primary z-0"
          style={{ clipPath: "ellipse(150% 100% at 50% 0%)" }}
        />
      </div>

      {/* 2. QUOTE & DOWNLOADS */}
      <div
        className="ev-mar-xl ev-pad-x-xl ev-transition"
        style={{ maxWidth: "42rem", opacity: isActive ? 1 : 0 }}
      >
        <p className="ev-mar-b-lg text-slate-800 leading-relaxed">
          Believe in a future that is better than the past. Being a spacefaring
          civilization is about exciting possibilities.
        </p>
        <div className="ev-flex ev-gap-md ev-mar-b-xl">
          <EvButton
            text="Get started"
            variant="secondary"
            onClick={() => alert("Started")}
          />
          <EvButton text="Download Android" variant="primary" />
          <EvButton text="Download IOS" variant="primary" />
        </div>
      </div>

      {/* 3. SCROLLING FEATURES (EVFeatures Logic) */}
      <section className="w-full">
        {FEATURES_DATA.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              featureRefs.current[index] = el;
            }}
            className={`featureContainer py-24 ${feature.bgColor} flex items-center transition-colors duration-700`}
          >
            <div
              className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="relative overflow-hidden group">
                <div className="zoomImage uniqueImageShape overflow-hidden aspect-video lg:aspect-square">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-y-6 ${feature.textColor} text-center lg:text-left`}
              >
                <h2
                  className="reveal font-bold leading-tight"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {feature.title}
                </h2>
                <p
                  className="fadeSlide opacity-80"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  {feature.content}
                </p>
                <div className="reveal">
                  <button className="px-8 py-4 rounded-full font-semibold border-2 border-current transition-all hover:scale-105 active:scale-95 hover:bg-white hover:text-black">
                    {feature.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. GAUGE & LIVE OS */}
      <section className="section-green ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center">
        <div className="max-w-7xl ev-mar-auto grid lg:grid-cols-2 ev-gap-xl items-center w-full">
          <div data-animate="fade-up" className="ev-flex ev-justify-center">
            <GaugeChart metrics={METRICS} />
          </div>
          <div className="ev-flex ev-flex-col ev-gap-md" data-animate="fade-up">
            <h2 className="text-6xl font-black">Live OS.</h2>
            <EvExpandableCard title="Bolt Earth OS V3.0" subtitle="Low Latency">
              Real-time city management.
            </EvExpandableCard>
          </div>
        </div>
      </section>

      {/* 5. ROADMAP */}
      <section className="section-green ev-pad-y-xl ev-pad-x-md min-h-[60vh] ev-flex ev-items-center">
        <div className="max-w-7xl ev-mar-auto w-full" data-animate="fade-up">
          <h2 className="text-center text-6xl font-black ev-mar-b-xl">
            Partnership Roadmap
          </h2>
          <EvRoadmap steps={ROADMAP} />
        </div>
      </section>

      {/* 6. HARDWARE */}
      <section className="section-white ev-pad-y-xl min-h-[80vh] ev-flex ev-flex-col items-center">
        <h2
          className="text-center text-6xl font-black ev-mar-b-2xl"
          data-animate="fade-up"
        >
          Core Hardware.
        </h2>
        <EvFlexCards data={SOLUTIONS} />
      </section>

      {/* 7. CONTACT FORM */}
      <section className="section-white ev-pad-y-xl ev-pad-x-md min-h-[70vh] ev-flex items-center justify-center">
        <div
          className="ev-flex ev-flex-col ev-gap-lg ev-pad-lg ev-bg-white ev-rounded-xl ev-shadow-popover max-w-xl ev-border w-full"
          data-animate="fade-up"
        >
          <h2 className="text-4xl font-black text-center">Build the Future.</h2>
          <EvInput label="Work Email" value={email} onChange={setEmail} />
          <EvCheckbox
            label="I agree to terms"
            checked={agree}
            onChange={setAgree}
          />
          <EvSubmitButton
            text="Send Inquiry"
            variant="primary"
            onClick={() => showToast({ title: "Sent!", type: "success" })}
          />
        </div>
      </section>
    </div>
  );
};

export default UnifiedMarsEVPage;
