import React from "react";
import Image from "next/image";

// dummy cards data
const cards = [
  {
    img: "/assets/s1.png",
    title: "Celebrate Her Forever with a Gift She’ll Always Remember",
    badge: "Wedding",
  },
  {
    img: "/assets/s2.png",
    title: "Honor the Beginning of a Beautiful Journey Together",
    badge: "Engagement",
  },
  {
    img: "/assets/s3.png",
    title: "Mark Every Year of Love with a Meaningful Surprise",
    badge: "Anniversary",
  },
];

export default function SecondSection() {
  return (
    <section className="flex items-center justify-between gap-6">
      {cards.map((item, idx) => (
        <div
          key={idx}
          className="relative flex-1 h-68 overflow-hidden rounded-2xl bg-gray-100"
        >
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-r from-black/0 to-black/50 ">
            <span className="bg-white text-red-600 text-xs font-medium px-2 mb-2 rounded-full w-fit">
              {item.badge}
            </span>

            <h2 className="text-white text-2xl font-semibold ">
              {item.title}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}
