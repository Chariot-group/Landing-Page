import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "@/i18n/locales";

export default function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "en", // Remplace par ta locale par défaut
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Ignore les fichiers statiques
};
