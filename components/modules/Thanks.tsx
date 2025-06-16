"use client";

import { use, useEffect, useState } from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

export function Thanks() {

    const testimonials = [
        {
            quote:
                "Nous avons été accompagnés par Jovis Lélue, qui a contribué aux premières phases de conception et apporté une aide précieuse sur la partie DevOps et la gestion de configurations.",
            name: "Jovis Lélue",
            designation: "Développeur",
            src: "/thanks/JL.webp",
        },
        {
            quote:
                "Nous avons bénéficié de l’expertise d’Emma Caroff pour le graphisme et la création de maquettes lors des premières itérations du projet.",
            name: "Emma Caroff",
            designation: "UI/UX Designeuse",
            src: "/thanks/EC.webp",
        },
        {
            quote:
                "Dans le cadre de la création de premières affiches de publicité, nous avons reçu l’aide de Morgane Vigier pour la création de celles-ci.",
            name: "Morgane Vigier",
            designation: "Marqueteuse",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Afin de créer des illustrations nécessaires à certaines parties de l’application, Léane Loubère nous a apporté une aide significative.",
            name: "Léane Loubère",
            designation: "Illustratrice",
            src: "/thanks/LL.webp",
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
        <section className="container px-6 w-full mx-auto mt-20 mb-20" id="thanks">
            <h3 className="text-3xl">{"Remerciements"}</h3>
            <div className="flex flex-col gap-2 p-10">
                <p>Rien de tout cela n’aurait été possible sans le talent, l’énergie et la générosité de celles et ceux qui ont contribué, de près ou de loin, à faire grandir ce projet.</p>
                <p>Nous tenons à exprimer notre profonde gratitude à toutes les personnes qui nous ont soutenus, conseillés, challengés ou inspirés. Chaque geste, chaque idée, chaque mot d'encouragement a compté.</p>
                <p>Voici celles et ceux que nous tenons à remercier, sincèrement.</p>
            </div>
            <div>
                <AnimatedTestimonials testimonials={testimonials} />
            </div>
        </section>
    );
}