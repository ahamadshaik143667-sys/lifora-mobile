/**
 * Supabase Edge Function stub: create-checkout-session
 *
 * This is a **server-side** example. It is NOT used directly by the mobile app.
 * Wire it into your Supabase project and add real Stripe logic there.
 *
 * SECURITY:
 * - Never expose Stripe secret keys or service-role keys in the mobile app.
 * - Use environment variables configured in Supabase (e.g. STRIPE_SECRET_KEY).
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
    const body = await req.json();

    // Example payload: { priceId: string, userId: string }
    const { priceId, userId } = body ?? {};

    if (!priceId || !userId) {
      return new Response(JSON.stringify({ error: 'Missing priceId or userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO: Implement real Stripe checkout session creation.
    // const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    // const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

    const fakeSessionId = 'cs_test_fake_session_id';

    return new Response(JSON.stringify({ sessionId: fakeSessionId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('create-checkout-session error', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
