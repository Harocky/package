"use client";

import React, {
  useEffect,
  useState,
  useRef,
  CSSProperties,
  useMemo,
} from "react";
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
import EvButton from "@/app/components/ui/EvButton";

const IMG =
  "[https://images.unsplash.com/photo-1593941707882-a5bba14938c7](https://images.unsplash.com/photo-1593941707882-a5bba14938c7)";

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Wilson",
    role: "Manager",
    avatar: "[https://i.pravatar.cc/150?u=1](https://i.pravatar.cc/150?u=1)",
    highlight: "Quick support.",
    quote: "The product stands out compared to others in the market.",
    location: "BANGALORE",
  },
  {
    id: "2",
    name: "Sarah J.",
    role: "Director",
    avatar: "[https://i.pravatar.cc/150?u=2](https://i.pravatar.cc/150?u=2)",
    highlight: "Fast integration.",
    quote: "Deployment was faster than we anticipated.",
    location: "GURUGRAM",
  },
  {
    id: "3",
    name: "Arjun M.",
    role: "Facility Head",
    avatar: "[https://i.pravatar.cc/150?u=3](https://i.pravatar.cc/150?u=3)",
    highlight: "Robust hardware.",
    quote: "Uptime on these units is unmatched globally.",
    location: "MUMBAI",
  },
  {
    id: "4",
    name: "Emily C.",
    role: "Sustainability",
    avatar: "[https://i.pravatar.cc/150?u=4](https://i.pravatar.cc/150?u=4)",
    highlight: "ESG Goals.",
    quote: "Data analytics dashboard is exactly what we needed.",
    location: "BENGALURU",
  },
  {
    id: "5",
    name: "Kiran R.",
    role: "Investor",
    avatar: "[https://i.pravatar.cc/150?u=5](https://i.pravatar.cc/150?u=5)",
    highlight: "High ROI.",
    quote: "The passive income model is highly scalable.",
    location: "HYDERABAD",
  },
  {
    id: "6",
    name: "Vikram S.",
    role: "Architect",
    avatar: "[https://i.pravatar.cc/150?u=6](https://i.pravatar.cc/150?u=6)",
    highlight: "Compact design.",
    quote: "Fits perfectly in modern urban landscapes.",
    location: "PUNE",
  },
  {
    id: "7",
    name: "Sneha W.",
    role: "Retail Head",
    avatar: "[https://i.pravatar.cc/150?u=7](https://i.pravatar.cc/150?u=7)",
    highlight: "Footfall increase.",
    quote: "Charging stations attracted more premium customers.",
    location: "CHENNAI",
  },
  {
    id: "8",
    name: "David L.",
    role: "Fleet Owner",
    avatar: "[https://i.pravatar.cc/150?u=8](https://i.pravatar.cc/150?u=8)",
    highlight: "Reliable API.",
    quote: "Software syncs perfectly with our tracking app.",
    location: "DELHI",
  },
  {
    id: "9",
    name: "Priya K.",
    role: "Tech Lead",
    avatar: "[https://i.pravatar.cc/150?u=9](https://i.pravatar.cc/150?u=9)",
    highlight: "IoT Native.",
    quote: "Most advanced firmware we have ever integrated.",
    location: "KOCHI",
  },
  {
    id: "10",
    name: "Marcus T.",
    role: "Developer",
    avatar: "[https://i.pravatar.cc/150?u=10](https://i.pravatar.cc/150?u=10)",
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

const UnifiedMarsEVPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { showToast } = useToast();
  const mainRef = useRef<HTMLDivElement>(null);
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
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("is-visible"),
        );
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="ev-bg-main ev-mar-auto w-full"
    >
      <div
        className="relative ev-mar-t-lg ev-mar-x-md"
        style={{ height: "500px" }}
      >
        <div
          className={`absolute right-[50px] bottom-[-150px] z-30 pointer-events-none ev-transition`}
          style={{
            width: "450px",
            transitionDuration: "1500ms",
            opacity: isActive ? 1 : 0,
            filter: isActive ? "blur(0px)" : "blur(10px)",
            transform: isActive ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <Image
            src="[https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkf2vL5-ftKxB9Ro6nC9TWEY0uFbGg7y479Q&s](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkf2vL5-ftKxB9Ro6nC9TWEY0uFbGg7y479Q&s)"
            alt="Astronaut"
            className="w-full"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}
            width={1000}
            height={1000}
          />
        </div>

        <div
          className="relative w-full h-full ev-rounded-xl ev-shadow-lg z-10 overflow-hidden"
          style={{
            clipPath: "ellipse(150% 100% at 50% 0%)",
            backgroundImage:
              'url("[https://ev-a2z.com/wp-content/uploads/2022/05/Front-view-electric-car-silhouette-with-green-glowing-on-dark-background.-EV-concept.-Vector-illustration-e1674284855247.jpeg](https://ev-a2z.com/wp-content/uploads/2022/05/Front-view-electric-car-silhouette-with-green-glowing-on-dark-background.-EV-concept.-Vector-illustration-e1674284855247.jpeg)")',
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
                lineHeight: 1.1,
                maxWidth: "500px",
                transitionDuration: "700ms",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(60px)",
              }}
            >
              Revealing the <br /> Treasures of the <br /> Universe
            </h1>
          </div>

          <div
            className="absolute top-[120px] right-[320px] ev-pad-xs ev-rounded-xl ev-border ev-shadow-popover z-20"
            style={{
              width: "144px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="ev-flex ev-items-center ev-gap-xs text-white"
              style={{ fontSize: "10px" }}
            >
              🕒 Spacewalks
            </div>
            <div
              className="ev-mar-t-xs ev-rounded-sm"
              style={{ height: "40px", background: "rgba(251, 146, 60, 0.3)" }}
            />
          </div>

          <div
            className="absolute top-[80px] right-[80px] ev-pad-xs ev-rounded-xl ev-border ev-shadow-popover z-20"
            style={{
              width: "128px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <div className="text-white" style={{ fontSize: "10px" }}>
              ❤️ Heart rate
            </div>
            <div
              className="ev-mar-t-xs"
              style={{ color: "#fb923c", fontSize: "1.125rem" }}
            >
              〰️〰️〰️
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-[-8px] left-0 w-full h-20 ev-bg-primary z-0 bg-ev-primary"
          style={{ clipPath: "ellipse(150% 100% at 50% 0%)" }}
        />
      </div>

      <div
        className="ev-mar-xl ev-pad-x-xl ev-transition"
        style={{
          maxWidth: "42rem",
          transitionDuration: "700ms",
          transitionDelay: "300ms",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(60px)",
        }}
      >
        <p
          className="ev-mar-b-lg"
          style={{ color: "#1f2937", lineHeight: 1.625 }}
        >
          You want to wake up in the morning and think the future is going to be
          great - and thats what being a spacefaring civilization is all about.
          <span style={{ fontWeight: 700 }}>
            {" "}
            Its about believing in the future{" "}
          </span>
          and thinking that the future will be better than the past.
        </p>

        <div className="ev-flex ev-gap-md">
          <EvButton
            text="Get started"
            variant="secondary"
            onClick={() => alert("Primary Clicked")}
          />
          <EvButton
            text="Download Android"
            variant="primary"
            onClick={() => alert("Primary Clicked")}
          />
          <EvButton
            text="Download IOS"
            variant="primary"
            onClick={() => alert("Primary Clicked")}
          />
        </div>
      </div>

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
                <p className="ev-text-lg text-slate-500 ev-mar-b-lg max-w-xl text-center">
                  Deploy infrastructure in minutes. Empowering the next billion
                  users with seamless IoT energy management.
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
                  className="ev-rounded-xl ev-shadow-lg object-cover"
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
                Advanced kernel architecture managing 1,900+ cities.
              </EvExpandableCard>
              <EvExpandableCard
                title="Cloud Management"
                subtitle="Remote Fleet Operations"
              >
                Single dashboard control for real-time tracking and health
                reports.
              </EvExpandableCard>
              <EvExpandableCard
                title="Eco-Smart Payouts"
                subtitle="Daily Revenue Settlement"
              >
                24-hour settlement cycles with blockchain encryption.
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
          </div>
        </div>
      </section>

      <section className="section-green ev-pad-y-xl ev-pad-x-md min-h-[90vh] ev-flex ev-items-center ev-justify-center">
        <div
          className="max-w-7xl ev-mar-auto w-full ev-flex ev-flex-col ev-gap-xl"
          data-animate="fade-up"
        >
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
          <EvInput label="Work Email" value={email} onChange={setEmail} />
          <EvCheckbox
            label="I agree to the terms"
            checked={agree}
            onChange={setAgree}
          />
          <EvSubmitButton
            text="Send Inquiry"
            variant="primary"
            onClick={() =>
              showToast({ title: "Inquiry Sent", type: "success" })
            }
          />
        </div>
      </section>
    </div>
  );
};

export default UnifiedMarsEVPage;
