"use client";

import EvTestimonial, { Testimonial } from "@/app/components/ui/EvTestimonial";

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Wilson",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?u=wilson",
    highlight: "I really appreciate the team's quick and reliable support.",
    quote:
      "I'm happy with the service and the overall EV charging experience—no major issues at all. The product stands out compared to others in the market, and I really appreciate the team's quick and reliable support.",
    location: "BRIGADE GOLDEN TRIANGLE, BANGALORE",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    role: "Operations Director",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    highlight: "Flawless integration with our existing systems.",
    quote:
      "The deployment was faster than we anticipated. The software is intuitive, and our residents have praised how easy it is to use the charging stations via the app.",
    location: "DLF CYBER CITY, GURUGRAM",
  },
  {
    id: "3",
    name: "Arjun Mehta",
    role: "Facility Head",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    highlight: "The most robust hardware we've tested.",
    quote:
      "We've tried several vendors before, but the uptime on these units is unmatched. The remote diagnostics feature saves our maintenance team hours of manual checking.",
    location: "HIRANANDANI ESTATE, MUMBAI",
  },
  {
    id: "4",
    name: "Emily Chen",
    role: "Sustainability Lead",
    avatar: "https://i.pravatar.cc/150?u=emily",
    highlight: "Helped us hit our carbon reduction goals early.",
    quote:
      "The data analytics dashboard provides exactly what we need for our ESG reporting. The support team was also fantastic in helping us set up custom rate tariffs.",
    location: "RMZ ECOWORLD, BENGALURU",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white py-20">
      <EvTestimonial data={TESTIMONIAL_DATA} />
    </main>
  );
}
