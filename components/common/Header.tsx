"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";


interface items {
    libelle: string,
    id: string
}
const itemsButtons: items[] = [
    {libelle: 'À propos', id: 'about'},
    {libelle: 'Nos offres', id: 'pricing'},
    {libelle: 'L\'équipe', id: 'team'},
    {libelle: 'Remerciements', id: 'thanks'},
    {libelle: 'Contact', id: 'contact'}
];

export function scrollToSection(section: string, isSheetOpen: boolean = false, setIsSheetOpen?: (open: boolean) => void) {
    const el = document.getElementById(section);
    if (el) {
        if (isSheetOpen && setIsSheetOpen) setIsSheetOpen(false);
        const topOffset = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: topOffset - 100,
            behavior: 'smooth'
        });
    }
}

export default function Header() {

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <section className="border-b-3 border-primary py-4 bg-card fixed top-0 left-0 w-full z-50">
            <nav className="container px-6 mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-wide cursor-pointer" onClick={() => scrollToSection('hero')}>
                    CHARIOT
                </h1>
                <div className="flex items-center gap-4 xl:gap-8">
                    <ul className="hidden xl:flex items-center gap-8">
                        {itemsButtons.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer hover:text-primary transition-colors duration-300"
                                onClick={() => scrollToSection(item.id)}
                            >
                            {item.libelle}
                            </li>
                        ))}
                    </ul>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild className="xl:hidden">
                            <Button variant="outline" size="icon">
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle className="cursor-pointer" onClick={() => scrollToSection('hero', isSheetOpen, setIsSheetOpen)}>{"CHARIOT"}</SheetTitle>
                                <SheetDescription>{"Votre outil de gestion de jeu de rôle"}</SheetDescription>
                            </SheetHeader>
                            <ul className="flex flex-col gap-2 mt-4">
                                {itemsButtons.map((item, index) => (
                                    <li
                                        key={index}
                                        className="h-9 px-4 py-2 cursor-pointer hover:text-primary transition-colors duration-300"
                                        onClick={() => scrollToSection(item.id, isSheetOpen, setIsSheetOpen)}
                                    >
                                    {item.libelle}
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </section>
    );
}