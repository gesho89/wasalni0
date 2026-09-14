import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  const payload = await request.text()
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 })
  try {
    const event = getStripe().webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET)
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object
      if (session.payment_status === 'paid') console.log('[v0] Stripe payment confirmed:', session.id)
    }
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }
}
