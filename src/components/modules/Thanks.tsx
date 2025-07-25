"use client";

import { useEffect, useState } from "react";
import { AnimatedTestimonials, Testimonial } from "@/components/ui/animated-testimonials";
import { useTranslations } from "next-intl";

export function Thanks() {
  const t = useTranslations("thanks");

  const testimonials: Testimonial[] = [
    {
      quote: "JL",
      name: "Jovis Lélue",
      designation: "developer",
      src: "/thanks/JL.webp",
    },
    {
      quote: "EC",
      name: "Emma Caroff",
      designation: "designer",
      src: "/thanks/EC.webp",
    },
    {
      quote: "MV",
      name: "Morgane Vigier",
      designation: "marketer",
      src: "/thanks/MV.webp",
    },
    {
      quote: "LL",
      name: "Léane Loubère",
      designation: "illustrator",
      src: "/thanks/LL.webp",
    },
    {
      quote: "AB",
      name: "Amina Boudah",
      designation: "marketer",
      src: "/thanks/AB.webp",
    },
    {
      quote: "RL",
      name: "Rémi Leroi",
      designation: "marketer",
      src: "/thanks/RL.webp",
    },
    {
      quote: "GB",
      name: "Gabriel Betaille",
      designation: "graphicDesigner",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <section
      className="container px-6 w-full mx-auto mt-20 mb-20"
      id="thanks">
      <h3 className="text-3xl">{t("title")}</h3>
      <div className="flex flex-col gap-2 mt-6">
        {(t.raw("content") as string[]).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
