-- Minimal schema for courses and purchases tables for Lifora
-- This is a backend concern (not used directly by the mobile app).
-- Apply via your database migration system (e.g., Supabase, Prisma, or raw SQL).

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'usd',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses (slug);

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases (user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_course_id ON purchases (course_id);


