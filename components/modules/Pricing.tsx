"use client";

import { IProduct } from "@/models/IProduct";
import { ProductService } from "@/services/Procucts";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Stripe from 'stripe';
import { Button } from "../ui/button";
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutService } from "@/services/Checkout";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export function Pricing() {

    const [hasLoading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setLoading(true);

        ProductService.getProducts()
            .then((data: any) => setProducts(data.data.sort((a: IProduct, b: IProduct) => {
                if (a.prices[0].unit_amount! < b.prices[0].unit_amount!) return -1;
                if (a.prices[0].unit_amount! > b.prices[0].unit_amount!) return 1;
                return 0;
            }
            )))
            .then(() => setLoading(false));
    }, []);

    const handleCheckout = async (product: IProduct, price: any) => {

        console.log("Checkout for product:", product.name, "with price ID:", price);
        if(!product) return;
        const res = await CheckoutService.getCheckout(
            product?.id,
            price
        );

        const data = await res.json();

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
    };

    const [isByMounth, setIsByMounth] = useState<boolean>(false);

    return (
        <section className="container px-6 w-full mx-auto mt-20 mb-20" id="pricing">
            <div className="flex flex-row gap-2 mt-6">
                <h3 className="text-3xl ">{"Nos offres"}</h3>
                <div className="flex items-center gap-2 ml-auto">
                    <Label htmlFor="airplane-mode">Plan annuel</Label>
                    <Switch id="airplane-mode" checked={isByMounth} onCheckedChange={() => setIsByMounth(!isByMounth)} />
                    <Label htmlFor="airplane-mode">Plan mensuel</Label>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-20 mt-6">
                {hasLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <span className="text-lg">Chargement...</span>
                    </div>
                ) : (
                    products.map((product: IProduct) => {
                        let byMouth: Stripe.Price = product.prices.filter((price) => price.recurring?.interval === "month")[0];
                        let byYear: Stripe.Price = product.prices.filter((price) => price.recurring?.interval === "year")[0];

                        return (
                            <Card key={product.id} className="p-6 flex items-center flex-col gap-7">
                                <div className="flex flex-col items-center gap-2">
                                    <h4 className="text-2xl font-medium">{product.name.toUpperCase()}</h4>
                                    {
                                        isByMounth ?
                                        <span>{byMouth.unit_amount! / 100}€/mois</span> :
                                        <div className="flex justify-center gap-2">
                                            <span className="line-through">{(byMouth.unit_amount! / 100)*12}</span>
                                            <span className="flex justify-center">{byYear.unit_amount! / 100}€/an</span>
                                        </div>
                                    }
                                    
                                </div>
                                <div className="flex flex-col gap-2">
                                    {product.marketing_features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 00-1.414 1.414l3.707 3.707a3 3 0 004.243 0l7-7z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature.name}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-center w-full">
                                    {
                                        process.env.NEXT_PUBLIC_STATE === "soft_opening" ? 
                                            <div className="items-center justify-center cursor-pointer flex w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6">
                                                <span>Prochainement ...</span>
                                            </div>
                                        :
                                            <Button size={"lg"} onClick={() => handleCheckout(product, isByMounth ? byMouth.id : byYear.id)} className="w-full">
                                                Souscrire à l'offre {product.name.toUpperCase()}
                                            </Button>
                                    }
                                    
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </section>
    );
}
