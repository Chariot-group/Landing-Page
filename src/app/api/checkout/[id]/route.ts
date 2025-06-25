import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const resolvedParams = await params;

  try {
    const session = await stripe.checkout.sessions.retrieve(resolvedParams.id);

    return Response.json({
      session,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
