"use client";

import React from "react";
import { Icon } from "@iconify/react";

type Course = {
  icon: string;
  title: string;
  items: string[];
};

export default function Menu() {
  const courses: Course[] = [
    {
      icon: "circum:fork-knife",
      title: "Entrada",
      items: ["Crema de brócoli con queso"],
    },
    {
      icon: "circum:fork-knife",
      title: "Plato Fuerte",
      items: [
        "Pollo a la toscana",
        "Vegetales con hierbas y aceite de oliva",
        "Papas gratinadas y ensalada de frutos rojos con aderezo balsámico de frutos rojos",
      ],
    },
    {
      icon: "solar:wineglass-bold",
      title: "Refrescos",
      items: ["Coca Cola, Coca Zero, Sprite y agua"],
    },
  ];

  return (
    <section id="menu" className="bg-white">
      <div className="max-w-4xl mx-auto px-20 py-16 md:py-20 lg:py-28">
        <div className="text-center mb-10">
          <h2 className="display-font text-3xl md:text-4xl">Menú</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto mt-3">
            Deléitate con una experiencia culinaria excepcional preparada especialmente para ti
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 md:p-8">
          <div className="space-y-8">
            {courses.map((course) => (
              <div key={course.title}>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-200/70">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--color-dusty-600)]/10 grid place-items-center">
                    <Icon icon={course.icon} className="w-5 h-5 text-[color:var(--color-dusty-700)]" />
                  </div>
                  <h3 className="display-font text-xl md:text-2xl">{course.title}</h3>
                </div>
                <ul className="space-y-2 pl-5">
                  {course.items.map((item, idx) => (
                    <li key={idx} className="relative text-neutral-700">
                      <span className="absolute -left-4 top-2 h-1 w-1 rounded-full bg-[color:var(--color-dusty-700)]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
