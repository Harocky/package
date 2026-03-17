"use client";

import EvFeatureCard from "../../components/ui/EvFeatureCard";

export default function FeaturePage() {
  const data = [
    {
      title: "Neon Cyberpunk",
      description:
        "Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights.",
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Deep Forest",
      description:
        "Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Arctic Silence",
      description:
        "Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world.",
      image:
        "https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Desert Gold",
      description:
        "Capture the warmth of the setting sun over the endless rolling dunes. Capture the warmth of the setting sun over the endless rolling dunes. Capture the warmth of the setting sun over the endless rolling dunes. Capture the warmth of the setting sun over the endless rolling dunes. Capture the warmth of the setting sun over the endless rolling dunes. Capture the warmth of the setting sun over the endless rolling dunes. ",
      image:
        "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Neon Cyberpunk",
      description:
        "Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights. Dive into the high-contrast world of futuristic cityscapes and neon lights.",
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Deep Forest",
      description:
        "Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness. Discover the hidden paths and ancient trees of the northern pine wilderness.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Arctic Silence",
      description:
        "Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world. Minimalist landscapes of ice and snow from the edge of the world.",
      image:
        "https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen ev-bg-soft ev-pad-2xl">
      <div className="ev-card-grid">
        {data.map((item, index) => (
          <EvFeatureCard key={index} {...item} />
        ))}
      </div>
    </main>
  );
}
