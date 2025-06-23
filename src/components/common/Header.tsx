"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "@/components/common/LocaleSwitcher";
import { useTranslations } from "next-intl";

interface items {
  libelle: string;
  id: string;
}

export function scrollToSection(
  section: string,
  isSheetOpen: boolean = false,
  setIsSheetOpen?: (open: boolean) => void,
) {
  const el = document.getElementById(section);
  if (el) {
    if (isSheetOpen && setIsSheetOpen) setIsSheetOpen(false);
    const topOffset = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topOffset - 100,
      behavior: "smooth",
    });
  }
}

export default function Header() {
  const t = useTranslations("header");

  const itemsButtons: items[] = [
    { libelle: t("buttons.about"), id: "about" },
    { libelle: t("buttons.pricing"), id: "pricing" },
    { libelle: t("buttons.team"), id: "team" },
    { libelle: t("buttons.thanks"), id: "thanks" },
    { libelle: t("buttons.contact"), id: "contact" },
  ];

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <section className="border-b-3 border-primary py-4 bg-card fixed top-0 left-0 w-full z-50">
      <nav className="container px-6 mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold tracking-wide cursor-pointer">CHARIOT</h1>
        </Link>
        <div className="flex items-center gap-4 xl:gap-8">
          <ul className="hidden xl:flex items-center gap-8">
            {itemsButtons.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => scrollToSection(item.id)}>
                {item.libelle}
              </li>
            ))}
          </ul>
          <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger
              asChild
              className="xl:hidden">
              <Button
                variant="outline"
                size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link href={"/"}>
                  <SheetTitle className="cursor-pointer">{"CHARIOT"}</SheetTitle>
                  <SheetDescription>{t("subtitle")}</SheetDescription>
                </Link>
              </SheetHeader>
              <ul className="flex flex-col gap-2 mt-4">
                {itemsButtons.map((item, index) => (
                  <li
                    key={index}
                    className="h-9 px-4 py-2 cursor-pointer hover:text-primary transition-colors duration-300"
                    onClick={() => scrollToSection(item.id, isSheetOpen, setIsSheetOpen)}>
                    {item.libelle}
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
          <LanguageSwitcher />
        </div>
      </nav>
    </section>
  );
}
