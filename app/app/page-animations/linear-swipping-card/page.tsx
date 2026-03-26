import TestimonialSlider from "@/app/components/animations/LinearSwippingCard";

export default function Page() {
  const testimonials = Array.from({ length: 15 }).map((_, i) => ({
    name: `Client Name ${i + 1}`,
    role: "EV Infrastructure Partner",
    avatar: `https://i.pravatar.cc/150?u=${i}`,
    review:
      "The EV charging platform has transformed how we manage energy distribution, monitor stations, and scale our network efficiently across multiple locations.",
  }));

  const content = {
    title: "EV Charging Network Testimonials",
    subtitle:
      "Industry leaders share their experience with next-generation electric vehicle charging solutions.",
  };

  return <TestimonialSlider testimonials={testimonials} content={content} />;
}
