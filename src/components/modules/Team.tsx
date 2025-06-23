"use client";

import { scrollToSection } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface IProfile {
  name: string;
  role: string;
  image: string;
}

export function Team() {
  const t = useTranslations("team");

  const teamMembers: IProfile[] = [
    {
      name: "Hugo Piedanna",
      role: `Tech Lead & ${t("developer")}`,
      image: "/team/HP.webp",
    },
    {
      name: "Elvis Pichou",
      role: `Product Owner & ${t("developer")}`,
      image: "/team/EP.webp",
    },
  ];

  return (
    <section
      className="container px-6 w-full mx-auto mt-20 mb-20"
      id="team">
      <h3 className="text-3xl ">{t("title")}</h3>
      <div className="grid lg:grid-cols-2 gap-20 p-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4">
            <img
              src={member.image}
              alt={member.name}
              className="rounded-xl w-1/2 object-cover"
            />
            <h4 className="text-xl font-semibold">{member.name}</h4>
            <p className="text-center">{member.role}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-10">
        {(t.raw("description") as string[]).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button
          size={"lg"}
          onClick={() => scrollToSection("pricing")}>
          {t("joinUs")}
        </Button>
      </div>
    </section>
  );
}
