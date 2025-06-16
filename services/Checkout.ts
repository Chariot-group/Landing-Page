import Stripe from "stripe";

class CheckoutsService {

    private static instance: CheckoutsService;
    private readonly BASE: string = "/api/checkout";

    public static getInstance(): CheckoutsService {
        if(!this.instance) {
            this.instance = new CheckoutsService();
        }
        return this.instance;
    }

    public async getCheckout(productId: string, currentVariantId: string): Promise<Response> {

        return await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                productId: productId,
                priceId: currentVariantId
            }),
        });
    }

    public async getSession(id: string): Promise<Stripe.Checkout.Session> {

        const res = await fetch(`${this.BASE}/${id}`);
  
        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const data = await res.json();
        return data.session;
    }
}

export const CheckoutService = CheckoutsService.getInstance();