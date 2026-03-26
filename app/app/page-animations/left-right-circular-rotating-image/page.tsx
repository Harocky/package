import CircularUI from "@/app/components/animations/LeftRightCircularRotatingImage";

export default function Page() {
  const images = Array.from(
    { length: 12 },
    (_, i) => `https://i.pravatar.cc/300/400?u=user${i}`,
  );

  return (
    <CircularUI
      images={images}
      content={{
        title: "Electric Vehicle Charging Infrastructure",
        description:
          "Electric vehicle charging infrastructure is the backbone of the transition to sustainable mobility. As EV adoption accelerates globally, the demand for reliable, fast, and accessible charging solutions continues to grow.",
      }}
    />
  );
}
