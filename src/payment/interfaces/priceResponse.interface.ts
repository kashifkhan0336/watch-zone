import Stripe from "stripe";

export interface PriceResponse {
    publishableKey: string;
    prices: Stripe.Price[];
}