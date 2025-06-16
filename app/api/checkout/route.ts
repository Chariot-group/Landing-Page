import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { productId, priceId, pattern, colors, specification } = body;

    if (!productId) {
      return Response.json({ error: 'Missing productId' }, { status: 400 });
    }

    const product = await stripe.products.retrieve(productId);
    const prices = await stripe.prices.list({ product: productId });

    const selectedPrice = prices.data.find(price => price.id === priceId);

    if (!selectedPrice) {
      return Response.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    const name: string = `${product.name} ${selectedPrice.nickname && `- ${selectedPrice.nickname}`}`;
    const unitAmount: number = selectedPrice.unit_amount || -1;

    if (unitAmount < 0) {
      return Response.json({ error: 'Invalid price amount' }, { status: 400 });
    }


    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['FR'],
        },
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: name,
                        description: product.description || '',
                        images: product.images || [],
                        metadata: {
                            pattern: pattern,
                            colors: JSON.stringify(colors),
                            specification: specification,
                        },
                    },
                    unit_amount: unitAmount,
                    tax_behavior: 'exclusive',
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: 1,
            },
        ],
        invoice_creation: {
            enabled: true,
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });
    
    return Response.json({ sessionId: session.id });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
