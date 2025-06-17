"use client";

import { JSX } from "react";
import { scrollToSection } from "./Header";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

interface Netword {
    name: string;
    url: string;
    icon: JSX.Element
}

const networks: Netword[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/chariot/",
        icon: <IconBrandInstagram stroke={2} />
    },
    {
        name: "Tiktok",
        url: "https://www.tiktok.com/@chariot",
        icon: <IconBrandTiktok stroke={2} />
    }
];

export function Footer() {
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
                    <a href="#" target="_blank" className="hover:underline underline-offset-2">CGV</a>
                    <a href="#" target="_blank" className="hover:underline underline-offset-2">CGU</a>
                </div>
            </div>
        </section>
    )
}