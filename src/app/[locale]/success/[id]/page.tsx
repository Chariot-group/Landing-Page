"use client";

import { CheckoutService } from "@/services/Checkout";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function SuccessPage() {
  const t = useTranslations("success");

  const params = useParams();
  const router = useRouter();

  const [sessionData, setSessionData] = useState<Stripe.Checkout.Session>();

  useEffect(() => {
    if (params.id) {
      CheckoutService.getSession(params.id as string)
        .then((data) => setSessionData(data))
        .catch((error) => {
          router.push("/");
        });
    }
  }, [params.id, router]);

  if (!sessionData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center h-full w-full">
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg mt-2">
          {t.raw("content")[0]}{" "}
          <a
            className="font-medium"
            href={`https://mail.google.com/mail/u/?authuser=${sessionData.customer_details?.email}`}>
            {sessionData.customer_details?.email}
          </a>{" "}
          {t.raw("content")[1]}
        </p>
        <p className="text-lg mt-2">{t("thanks")}</p>
      </div>
    </section>
  );
}
