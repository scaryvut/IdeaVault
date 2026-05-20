"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/banner1.avif",
    title: "Where Innovative Ideas Become Reality",
    description:
      "Explore groundbreaking startup concepts, connect with creators, and discover the future of innovation.",
  },
  {
    id: 2,
    image: "/banner2.avif",
    title: "Discover Startups That Can Change The World",
    description:
      "From AI products to sustainable businesses — find ideas that inspire action and impact.",
  },
  {
    id: 3,
    image: "/banner3.jpg",
    title: "Share Your Vision With The Community",
    description:
      "Publish your startup ideas, receive feedback, and collaborate with creative thinkers worldwide.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-0 h-[75vh] w-full overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            current === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >

          {/* Background */}
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >

            {/* Overlay (kept inside z-10 but below navbar) */}
            <div className="w-full h-full bg-black/60 flex items-center">

              <div className="max-w-7xl mx-auto px-6 text-white z-10 relative">

                <div className="max-w-2xl">

                  <p className="uppercase tracking-[4px] text-sm text-gray-300 mb-4">
                    Startup • Innovation • Creativity
                  </p>

                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-gray-200 mb-8">
                    {slide.description}
                  </p>

                  <Link
                    href="/ideas"
                    className="inline-flex px-7 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
                  >
                    Explore Ideas
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Banner;