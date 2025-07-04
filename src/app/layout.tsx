import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHARIOT - Modern dungeon master tool",
  description:
    "Chariot est l'application web dédiée aux Maîtres du Jeu de Donjons & Dragons et autres jeux de rôle. Organisez vos parties, suivez les combats, gérez vos campagnes. Intuitif, multilingue et pensé pour les MJ en présentiel.",
  applicationName: "CHARIOT",
  authors: [
    {
      name: "Hugo Piedanna",
      url: "https://piedanna.dev/",
    },
    {
      name: "Elvis Pichou",
      url: "https://www.linkedin.com/in/elvis-pichou/",
    },
  ],
  robots: { index: true, follow: true },
  keywords: [
    // Marque
    "Chariot",
    "Chariot JDR",
    "Chariot TTRPG",
    "Chariot app",
    "Chariot MJ",
    "Chariot game master tool",

    // Français (FR)
    "jeu de rôle",
    "application maître du jeu",
    "outil MJ",
    "gestion campagne D&D",
    "outil de gestion JDR",
    "suivi combats JDR",
    "init tracker Donjons et Dragons",

    // Anglais (EN)
    "TTRPG tool",
    "D&D app",
    "game master app",
    "battle tracker",
    "initiative tracker",
    "DnD campaign manager",
    "tool for dungeon master",

    // Espagnol (ES)
    "aplicación rol de mesa",
    "herramienta director de juego",
    "seguimiento combates D&D",
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
