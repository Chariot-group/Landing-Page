"use client";

import { scrollToSection } from "../common/Header";
import { Button } from "../ui/button";

interface IProfile {
    name: string;
    role: string;
    image: string;
}

const teamMembers: IProfile[] = [
    {
        name: "Hugo Piedanna",
        role: "Tech Lead & Développeur",
        image: "/team/HP.webp"
    },
    {
        name: "Elvis Pichou",
        role: "Product Owner & Développeur",
        image: "/team/EP.webp"
    }
];

export function Team() {
    return (
        <section className="container px-6 w-full mx-auto mt-20 mb-20" id="team">
            <h3 className="text-3xl ">{"L'équipe"}</h3>
            <div className="grid lg:grid-cols-2 gap-20 p-10">
                {
                    teamMembers.map((member, index) => (
                       <div key={index} className="flex flex-col items-center gap-4">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-xl w-1/2 object-cover"
                            />
                            <h4 className="text-xl font-semibold">{member.name}</h4>
                            <p className="text-center">{member.role}</p>
                        </div>
                    ))
                }
                
            </div>
            <div className="flex flex-col gap-2 mt-10">
                <p>CHARIOT, c'est d'abord deux amis réunis par une passion commune pour les jeux de rôles. Ensembles, nous faisons l'expérience de la difficulté d'organiser des campagnes, en utilisant plusieurs outils, des sites web comme du papier et un crayon. Et puis, un jour, nous nous décidons : nous allons créer notre propre outil pour faciliter l'organisation de nos campagnes. C'est ainsi que né CHARIOT, un outil de gestion unique, créé par des joueurs, pour des joueurs.</p>
                <p>Nous espérons que CHARIOT vous aidera et vous plaira autant qu'à nous.</p>
                <p>Place à l'aventure !</p>
            </div>
            <div className="flex justify-center mt-10">
                <Button size={"lg"} onClick={() => scrollToSection("pricing")}>
                    Rejoindre l'aventure CHARIOT
                </Button>
            </div>
        </section>
    );
}