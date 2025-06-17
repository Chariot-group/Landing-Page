"use client";

import { scrollToSection } from "@/components/common/Header";
import { useTranslations } from "next-intl";

export function Footer() {

    const t = useTranslations("footer");

    return (
        <section className="border-t-3 border-primary py-4 bg-card w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="w-full flex flex-col gap-2">
                    
                </div>
                <div className="w-full flex items-center gap-2 justify-center">
                    <h1 className="text-3xl font-bold tracking-wide cursor-pointer" onClick={() => scrollToSection("hero")}>
                        CHARIOT
                    </h1>
                </div>
                <div className="w-full flex flex-col gap-2 justify-left items-end">
                    <a href="#" target="_blank" className="hover:underline underline-offset-2">{t("CGV")}</a>
                    <a href="#" target="_blank" className="hover:underline underline-offset-2">{t("CGU")}</a>
                </div>
            </div>
        </section>
    )
}