import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { productId, priceId } = body;

    if (!productId) {
      return Response.json({ error: 'Missing productId' }, { status: 400 });
    }

    const prices = await stripe.prices.list({ product: productId });

    const selectedPrice = prices.data.find(price => price.id === priceId);

    if (!selectedPrice) {
      return Response.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    const unitAmount: number = selectedPrice.unit_amount || -1;

    if (unitAmount < 0) {
      return Response.json({ error: 'Invalid price amount' }, { status: 400 });
    }


    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        billing_address_collection: 'required',
        line_items: [
            {
                price: selectedPrice.id,
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        custom_fields: [
          {
            key: 'pseudo',
            label: {
              type: 'custom',
              custom: 'Pseudo',
            },
            type: 'text',
            text: {
              minimum_length: 1,
              maximum_length: 50,
            },
            optional: false,
          }
        ],
    });
    
    return Response.json({ sessionId: session.id });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
