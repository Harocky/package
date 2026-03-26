"use client";

import Image from "next/image";

type Props = {
  items: string[];
  content: {
    header: string;
    title: string;
    description: string;
  };
};

const HorizonUI = ({ items, content }: Props) => {
  const displayItems = items.slice(0, 12);

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-sans select-none">
      <header className="flex flex-col items-center justify-center text-center pt-10 pb-4 px-6 shrink-0 z-30 bg-white">
        <h1 className="text-[clamp(1.5rem,5vw,3.5rem)] font-extrabold max-w-[900px] text-slate-800 leading-tight">
          {content.header}
        </h1>
      </header>

      <section className="flex-1 relative flex flex-col items-center">

        <div className="absolute left-1/2 -translate-x-1/2 aspect-square w-full">
          <div className="w-full h-full relative animate-horizon-stepped">
            {displayItems.map((url, i) => {
              const angle = (i * 360) / displayItems.length;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(clamp(-45vw, -38vh, -500px))`,
                  }}
                >
                  <div
                    className="w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-slate-100 p-2 sm:p-5 animate-counter-stepped"
                    style={
                      {
                        "--start-angle": `-${angle}deg`,
                      } as React.CSSProperties
                    }
                  >
                    <Image
                      src={url}
                      alt="icon"
                      width={120}
                      height={120}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Content Area - Solid White to mask the rotating icons */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center text-center px-6 h-[35%] justify-center pb-12 bg-white border-t border-slate-50">
          <h2 className="text-xl sm:text-4xl font-bold text-slate-900">
            {content.title}
          </h2>
          <p className="text-sm sm:text-lg text-slate-500 mt-4 max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HorizonUI;
