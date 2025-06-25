import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/common/Header";
import ToastContainer from "@/components/common/ToastContainer";
import { Footer } from "@/components/common/Footer";
import { Locale } from "@/i18n/locales";
import RecaptchaScript from "@/components/modules/RecaptchaScript";

export default async function LocalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <RecaptchaScript lang={locale as Locale} />
      <header>
        <Header />
      </header>
      <main className="w-full h-full">
        <ToastContainer />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </NextIntlClientProvider>
  );
}
