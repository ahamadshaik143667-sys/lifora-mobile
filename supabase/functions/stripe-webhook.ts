/**
 * Supabase Edge Function stub: stripe-webhook
 *
 * This is a **server-side** example. It is NOT used directly by the mobile app.
 * Configure the Stripe webhook to point to this function's URL.
 *
 * SECURITY:
 * - Validate Stripe signatures using STRIPE_WEBHOOK_SECRET.
 * - Never log full event payloads with PII in production.
 */

// deno-lint-ignore no-explicit-any
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO: Validate signature and construct event:
    // const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    // const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    // const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
    // const event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET!);

    // TODO: Handle events (checkout.session.completed, invoice.paid, etc.)

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('stripe-webhook error', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
