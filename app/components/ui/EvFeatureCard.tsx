"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function EvFeatureCard({ title, description, image }: Props) {
  return (
    <div className="ev-card-item">
      <Image
        src={image}
        alt={title}
        fill
        className="ev-card-img"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
      />

      <div className="ev-card-overlay">
        <h3 className="ev-card-title">{title}</h3>

        <div className="ev-card-desc-wrapper">
          <div className="ev-card-desc-inner">
            <p className="ev-card-desc">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
