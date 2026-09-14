import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null)
  const amount = Number(body?.amount)
  if (!Number.isInteger(amount) || amount < 10 || amount > 1000) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  const origin = request.headers.get('origin') || process.env.BETTER_AUTH_URL || 'http://localhost:3000'
  const stripe = getStripe()
  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price_data: { currency: 'egp', product_data: { name: `شحن محفظة تك توكي - ${amount} ج.م` }, unit_amount: amount * 100 }, quantity: 1 }],
    success_url: `${origin}/passenger/wallet?payment=success`,
    cancel_url: `${origin}/passenger/wallet?payment=cancelled`,
    client_reference_id: session.user.id,
    metadata: { userId: session.user.id, walletAmount: String(amount) },
  }, { idempotencyKey: `wallet-${session.user.id}-${amount}-${Date.now()}` })
  return NextResponse.json({ url: checkout.url })
}
