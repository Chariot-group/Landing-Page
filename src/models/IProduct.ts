import type Stripe from "stripe";

export type IProduct = Stripe.Product & {
  prices: Stripe.Price[];
};
