import HorizonUI from "@/app/components/animations/BottomCircularRotatingImage";

export default function Page() {
  const icons = [
    "https://cdn-icons-png.flaticon.com/512/281/281769.png",
    "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
    "https://cdn-icons-png.flaticon.com/512/732/732223.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968771.png",
  ];

  const items = Array.from({ length: 20 }, (_, i) => icons[i % icons.length]);

  const content = {
    header: "Smart EV Charging Network Integration",
    title: "Ultra-Fast Charging Systems",
    description:
      "Modern electric vehicle ecosystems depend heavily on intelligent integration between charging infrastructure and digital platforms. Advanced EV charging systems are designed to seamlessly connect with navigation tools, fleet management software, mobile applications, and energy grids.",
  };

  return <HorizonUI items={items} content={content} />;
}
