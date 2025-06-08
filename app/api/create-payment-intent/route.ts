import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil", // Use the required API version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, credits } = body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: "usd",
      metadata: {
        credits: credits.toString(),
      },
      // Add automatic_payment_methods for better payment method detection
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Failed to create payment intent");
    }

    // Return the client secret
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
