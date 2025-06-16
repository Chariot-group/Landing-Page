"use client";

import { scrollToSection } from "../common/Header";
import { Button } from "../ui/button";

export function Hero() {
    return (
        <section className="container w-full px-6 mx-auto relative" id="hero">
            <div className="flex flex-col gap-10 mt-[20dvh] mb-[20dvh]">
                <h2 className="text-5xl font-medium leading-[3.5rem]">Laissez s'épanouir votre créativité,<br/> prenez en main vos campagnes <br/>et amusez-vous !</h2>
                <div>
                    <Button size={"lg"} onClick={() => scrollToSection("pricing")}>
                        Découvrez nos offres
                    </Button>
                </div>
            </div>
        </section>
    );
}