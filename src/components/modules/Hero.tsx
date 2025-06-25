"use client";

import { scrollToSection } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="container w-full px-6 mx-auto relative"
      id="hero">
      <div className="flex flex-col gap-10 mt-[20dvh] mb-[20dvh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <h2 className="text-5xl font-medium leading-[3.5rem]">{t("title")}</h2>
        </div>
        <div>
          <Button
            size={"lg"}
            onClick={() => scrollToSection("pricing")}>
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
