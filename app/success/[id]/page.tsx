"use client";

import { CheckoutService } from "@/services/Checkout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function SuccessPage() {

    const params = useParams();
    const router = useRouter();
    
    const [sessionData, setSessionData] = useState<Stripe.Checkout.Session>();

    useEffect(() => {
        if (params.id) {
            CheckoutService.getSession(params.id as string)
            .then(data => setSessionData(data))
            .catch((error) => {
            router.push('/');
            });
        }
    }, [params.id, router]);

    if (!sessionData) {
        return <p>Chargement...</p>;
    }

    return (
        <section className="flex flex-col items-center h-full w-full">
            <div className="flex flex-col items-center justify-center h-[89vh] w-full">
                <h1 className="text-4xl font-bold mb-4">Tout s'est bien passé, bienvenu sur Chariot !</h1>
                <p className="text-lg mt-2">Tu vas recevoir un email à <span className="font-medium">{sessionData.customer_details?.email}</span> pour activer ton compte.</p>
                <p className="text-lg mt-2">Régale toi avec CHARIOT !</p>
            </div>
        </section>
    );
}