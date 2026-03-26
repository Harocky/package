"use client";

import Image from "next/image";

type Props = {
  images: string[];
  content: {
    title: string;
    description: string;
  };
};

const CircularUI = ({ images, content }: Props) => {
  const leftSide = images.slice(0, 6);
  const rightSide = images.slice(6, 12);
  const radius = 200;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <section className="flex-[0.5] relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-[2px] h-[2px] left-[25%] animate-rotate-ring">
          {leftSide.map((url, i) => {
            const angle = i * 60;
            return (
              <div
                key={i}
                className="absolute w-[140px] h-[190px]"
                style={{
                  marginLeft: "-70px",
                  marginTop: "-95px",
                  transform: `rotate(${angle}deg) translateY(${radius}px)`,
                }}
              >
                <Image
                  src={url}
                  alt="portrait"
                  width={140}
                  height={190}
                  priority
                  className="w-full h-full rounded-lg border-[3px] border-white bg-slate-800 object-cover animate-counter-rotate"
                  style={
                    {
                      "--start-angle": `-${angle}deg`,
                    } as React.CSSProperties
                  }
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex-[1.2] z-50 bg-slate-900 flex flex-col items-center justify-center border-x border-slate-800 text-white text-center px-6">
        <h1 className="text-[2.5rem] font-bold">{content.title}</h1>
        <p className="opacity-70 max-w-[80%] mt-2">{content.description}</p>
      </section>

      <section className="flex-[0.5] relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-[2px] h-[2px] right-[25%] animate-rotate-ring">
          {rightSide.map((url, i) => {
            const angle = i * 60;
            return (
              <div
                key={i}
                className="absolute w-[140px] h-[190px]"
                style={{
                  marginLeft: "-70px",
                  marginTop: "-95px",
                  transform: `rotate(${angle}deg) translateY(${radius}px)`,
                }}
              >
                <Image
                  src={url}
                  alt="portrait"
                  width={140}
                  height={190}
                  priority
                  className="w-full h-full rounded-lg border-[3px] border-white bg-slate-800 object-cover animate-counter-rotate"
                  style={
                    {
                      "--start-angle": `-${angle}deg`,
                    } as React.CSSProperties
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CircularUI;
