"use client";

import { useState, useEffect, useRef, CSSProperties, useMemo } from "react";
import Image from "next/image";

import EvFlexCards, { EvFlexCardData } from "@/app/components/ui/EvFlexCards";
import EvRoadmap, { RoadmapStep } from "@/app/components/ui/EvRoadmap";
import EvExpandableCard from "@/app/components/ui/EvExpandableCard";
import GaugeChart, { GaugeMetric } from "@/app/components/charts/GaugeChart";
import EvSubmitButton from "@/app/components/ui/EvSubmitButton";
import EvTestimonial, { Testimonial } from "@/app/components/ui/EvTestimonial";
import EvInput from "@/app/components/ui/EvInput";
import EvCheckbox from "@/app/components/ui/EvCheckbox";
import { useToast } from "@/app/components/ui/EvToast";
import EvSlider from "@/app/components/ui/EvSlider";

const IMG = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7";

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Wilson",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?u=1",
    highlight: "Quick support.",
    quote: "The product stands out compared to others in the market.",
    location: "BANGALORE",
  },
  {
    id: "2",
    name: "Sarah J.",
    role: "Director",
    avatar: "https://i.pravatar.cc/150?u=2",
    highlight: "Fast integration.",
    quote: "Deployment was faster than we anticipated.",
    location: "GURUGRAM",
  },
  {
    id: "3",
    name: "Arjun M.",
    role: "Facility Head",
    avatar: "https://i.pravatar.cc/150?u=3",
    highlight: "Robust hardware.",
    quote: "Uptime on these units is unmatched globally.",
    location: "MUMBAI",
  },
  {
    id: "4",
    name: "Emily C.",
    role: "Sustainability",
    avatar: "https://i.pravatar.cc/150?u=4",
    highlight: "ESG Goals.",
    quote: "Data analytics dashboard is exactly what we needed.",
    location: "BENGALURU",
  },
  {
    id: "5",
    name: "Kiran R.",
    role: "Investor",
    avatar: "https://i.pravatar.cc/150?u=5",
    highlight: "High ROI.",
    quote: "The passive income model is highly scalable.",
    location: "HYDERABAD",
  },
  {
    id: "6",
    name: "Vikram S.",
    role: "Architect",
    avatar: "https://i.pravatar.cc/150?u=6",
    highlight: "Compact design.",
    quote: "Fits perfectly in modern urban landscapes.",
    location: "PUNE",
  },
  {
    id: "7",
    name: "Sneha W.",
    role: "Retail Head",
    avatar: "https://i.pravatar.cc/150?u=7",
    highlight: "Footfall increase.",
    quote: "Charging stations attracted more premium customers.",
    location: "CHENNAI",
  },
  {
    id: "8",
    name: "David L.",
    role: "Fleet Owner",
    avatar: "https://i.pravatar.cc/150?u=8",
    highlight: "Reliable API.",
    quote: "Software syncs perfectly with our tracking app.",
    location: "DELHI",
  },
  {
    id: "9",
    name: "Priya K.",
    role: "Tech Lead",
    avatar: "https://i.pravatar.cc/150?u=9",
    highlight: "IoT Native.",
    quote: "Most advanced firmware we have ever integrated.",
    location: "KOCHI",
  },
  {
    id: "10",
    name: "Marcus T.",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?u=10",
    highlight: "Easy setup.",
    quote: "SDK documentation is clear and easy to implement.",
    location: "GLOBAL",
  },
];

const SOLUTIONS: EvFlexCardData[] = [
  {
    id: "1",
    title: "Bolt.Lite",
    subtitle: "3.3kW IoT Charging for home and small business.",
    image: IMG,
  },
  {
    id: "2",
    title: "Bolt.Turbo",
    subtitle: "Ultra High-speed DC charging for transit.",
    image: IMG,
  },
  {
    id: "3",
    title: "Enterprise",
    subtitle: "Fleet management and monitoring hub.",
    image: IMG,
  },
  {
    id: "4",
    title: "Solar Hub",
    subtitle: "Clean, grid-independent power.",
    image: IMG,
  },
  {
    id: "5",
    title: "Community",
    subtitle: "Shared residential charging complexes.",
    image: IMG,
  },
];

const ROADMAP: RoadmapStep[] = [
  {
    title: "Grid Audit",
    desc: "Digital verification of local transformer capacity.",
    icon: <span>📊</span>,
  },
  {
    title: "Site Twin",
    desc: "Creating a 3D model for optimal charger placement.",
    icon: <span>🗺️</span>,
  },
  {
    title: "Rapid Install",
    desc: "Certified team deploys hardware in < 60 mins.",
    icon: <span>🚧</span>,
  },
  {
    title: "OS Sync",
    desc: "Connecting to Bolt Earth Cloud for fault detection.",
    icon: <span>⚡</span>,
  },
  {
    title: "Safety Check",
    desc: "Testing for voltage surges and heat control.",
    icon: <span>🛡️</span>,
  },
  {
    title: "Public Live",
    desc: "Station visible to 400k+ users on our app.",
    icon: <span>📱</span>,
  },
  {
    title: "Auto Earn",
    desc: "Daily settlements with automated tax reporting.",
    icon: <span>💰</span>,
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

export default function EVPage() {
  const { showToast } = useToast();
  const mainRef = useRef<HTMLDivElement>(null);
  const [battery, setBattery] = useState(60);
  const [power, setPower] = useState(50);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const time = useMemo(() => (battery / power).toFixed(1), [battery, power]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current)
        mainRef.current.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("is-visible"),
        );
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="ev-homepage" ref={mainRef}>
      <section className="section-white ev-flex ev-items-center ev-justify-center min-h-[90vh] relative ev-pad-x-md overflow-hidden">
        <div
          className="parallax-bg"
          style={{ "--speed": 1 } as CSSProperties}
        />
        <div className="ev-flex ev-flex-col lg:ev-flex-row ev-items-center ev-justify-center ev-gap-xl ev-mar-auto z-10 w-full">
          <div
            className="ev-flex-1 ev-flex ev-flex-col ev-gap-xl w-11/12"
            data-animate="fade-up"
          >
            <h1 className="text-8xl font-black ev-mar-y-md leading-[0.85] ev-flex ev-gap-md justify-center">
              {["India's", "Electric", "Future"].map((w, i) => (
                <span
                  key={i}
                  className="split-word"
                  style={{ "--index": i } as CSSProperties}
                >
                  {w}
                </span>
              ))}
            </h1>
            <div className="ev-flex ev-flex-row ev-items-center ev-justify-center ev-gap-xl w-11/12">
              <div className="ev-flex ev-flex-col lg:ev-flex-row ev-items-center ev-justify-center ev-gap-xl w-[40%]">
                <p className="ev-text-lg text-slate-500 ev-mar-b-lg max-w-xl text-center ">
                  Deploy infrastructure in minutes. Empowering the next billion
                  users with seamless IoT energy management. Empowering the next
                  billion users with seamless IoT energy management.
                </p>
                <div className="ev-flex ev-gap-md">
                  <EvSubmitButton text="Join Now" variant="primary" />
                  <EvSubmitButton text="Explore Map" variant="secondary" />
                </div>
              </div>

              <div className="hero-parallax-visual ev-flex ev-justify-center w-[60%]">
                <Image
                  src={IMG}
                  width={800}
                  height={600}
                  alt="Hero"
                  className="ev-rounded-xl ev-shadow-lg object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-green ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center ev-justify-center">
        <div className="max-w-7xl ev-mar-auto grid lg:grid-cols-2 ev-gap-xl ev-items-center w-full">
          <div data-animate="fade-up" className="ev-flex ev-justify-center">
            <GaugeChart metrics={METRICS} />
          </div>
          <div className="ev-flex ev-flex-col ev-gap-md" data-animate="fade-up">
            <h2 className="text-6xl font-black ev-mar-b-md">Live OS.</h2>
            <div className="ev-flex ev-flex-col ev-gap-sm">
              <EvExpandableCard
                title="Bolt Earth OS V3.0"
                subtitle="Sub-millisecond latency"
              >
                Advanced kernel architecture managing 1,900+ cities. Machine
                learning predicts peak demand to adjust load balancing
                instantly.
              </EvExpandableCard>
              <EvExpandableCard
                title="Cloud Management"
                subtitle="Remote Fleet Operations"
              >
                Single dashboard control for real-time tracking, dynamic
                tariffing, and automated hardware health reports.
              </EvExpandableCard>
              <EvExpandableCard
                title="Eco-Smart Payouts"
                subtitle="Daily Revenue Settlement"
              >
                24-hour settlement cycles with blockchain encryption. Full
                visibility into energy consumption vs earnings.
              </EvExpandableCard>
              <EvExpandableCard
                title="Grid Integration"
                subtitle="V2G Ready Infrastructure"
              >
                Future-proof hardware designed to support Vehicle-to-Grid energy
                transfer and peak-shaving strategies.
              </EvExpandableCard>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center ev-justify-center">
        <div
          className="ev-bg-white ev-rounded-xl ev-pad-xl max-w-6xl ev-mar-auto ev-flex ev-flex-col md:ev-flex-row ev-gap-xl ev-border ev-shadow-md w-full"
          data-animate="fade-up"
        >
          <div className="ev-flex-1 ev-flex ev-flex-col ev-justify-center ev-gap-lg">
            <h2 className="text-5xl font-black ev-mar-b-sm">Charge Time.</h2>
            <div className="ev-flex flex-col md:flex-row ev-justify-center ev-gap-lg w-full">
              <EvSlider
                label="Battery"
                value={battery}
                min={10}
                max={150}
                unit="kWh"
                onChange={setBattery}
              />
              <EvSlider
                label="Power"
                value={power}
                min={3}
                max={250}
                unit="kW"
                onChange={setPower}
              />
            </div>
          </div>
          <div className="ev-flex-1 ev-bg-primary ev-rounded-lg ev-flex ev-flex-col ev-items-center ev-justify-center ev-pad-xl text-white shadow-2xl">
            <span className="text-sm font-bold opacity-70 uppercase tracking-[0.2em]">
              Estimated Duration
            </span>
            <div className="text-[10rem] font-black leading-none">{time}h</div>
            <p className="ev-mar-t-lg opacity-80 text-center font-medium max-w-xs">
              Theoretical calculation for a full 0-100% cycle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-green ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center ev-justify-center">
        <div className="max-w-7xl ev-mar-auto w-full ev-flex ev-flex-col ev-gap-xl" data-animate="fade-up">
          <h2 className="text-center text-6xl font-black">
            Partnership Roadmap
          </h2>
          <EvRoadmap steps={ROADMAP} />
        </div>
      </section>

      <section className="section-white ev-pad-y-xl min-h-[90vh] ev-flex ev-flex-col ev-justify-center ev-items-center">
        <h2
          className="text-center text-6xl font-black ev-mar-b-2xl"
          data-animate="fade-up"
        >
          Core Hardware.
        </h2>
        <div
          className="ev-flex ev-justify-center w-full ev-pad-x-md"
          data-animate="fade-up"
        >
          <EvFlexCards data={SOLUTIONS} />
        </div>
      </section>

      <section className="section-green ev-pad-y-xl min-h-[90vh] ev-flex ev-flex-col ev-justify-center ev-items-center">
        <div className="text-center ev-mar-b-2xl" data-animate="fade-up">
          <h2 className="text-6xl font-black">Trusted by 400k+.</h2>
          <p className="ev-text-xl text-slate-500 ev-mar-t-md">
            Real stories from real hosts leading the electric revolution.
          </p>
        </div>
        <div data-animate="fade-up" className="w-full max-w-[90vw]">
          <EvTestimonial data={TESTIMONIAL_DATA} />
        </div>
      </section>

      <section className="section-white ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center ev-justify-center">
        <div
          className="ev-flex ev-flex-col ev-gap-lg ev-pad-lg ev-bg-white ev-rounded-xl ev-shadow-popover ev-mar-auto max-w-xl ev-border w-full"
          data-animate="fade-up"
        >
          <h2 className="text-4xl font-black text-center ev-mar-b-sm">
            Build the Future.
          </h2>
          <p className="text-center text-slate-500 ev-mar-b-md">
            Our partnership team will conduct a site assessment and guide your
            installation within 24 hours.
          </p>
          <EvInput label="Work Email" value={email} onChange={setEmail} />
          <EvCheckbox
            label="I agree to the partnership terms and global privacy policy"
            checked={agree}
            onChange={setAgree}
          />
          <EvSubmitButton
            text="Send Inquiry"
            variant="primary"
            onClick={() =>
              showToast({
                title: "Inquiry Sent",
                description: "A specialist will contact you shortly.",
                type: "success",
              })
            }
          />
        </div>
      </section>
    </main>
  );
}
