// routes/payment.js
// ── Install: npm install stripe @paypal/checkout-server-sdk ──────────────
const express = require('express')
const router  = express.Router()

// ── Sandbox credentials (swap for live when ready) ────────────────────────
const STRIPE_SECRET_KEY    = process.env.STRIPE_SECRET_KEY
const PAYPAL_CLIENT_ID     = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_ENV           = process.env.PAYPAL_ENV || 'sandbox'

// ── Stripe setup ──────────────────────────────────────────────────────────
const Stripe = require('stripe')
const stripe = Stripe(STRIPE_SECRET_KEY)

// ── PayPal setup ──────────────────────────────────────────────────────────
const paypal = require('@paypal/checkout-server-sdk')

function getPayPalClient() {
  const env = PAYPAL_ENV === 'live'
    ? new paypal.core.LiveEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
    : new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
  return new paypal.core.PayPalHttpClient(env)
}

// ─────────────────────────────────────────────────────────────────────────
// POST /api/payment/stripe/create-intent
// Called by frontend before showing Stripe card element
// Body: { amount: Number (GBP), currency: 'gbp', bookingData: {} }
// ─────────────────────────────────────────────────────────────────────────
router.post('/stripe/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'gbp', bookingData } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount * 100), // Stripe uses pence
      currency,
      metadata: {
        customerName:    bookingData?.name    || '',
        customerEmail:   bookingData?.email   || '',
        propertyDetails: bookingData?.propertyDetails || '',
        slotId:          String(bookingData?.slotId || ''),
      },
      description: `Prime EPC Assessment — ${bookingData?.propertyDetails || 'EPC'}`,
    })

    res.json({ success: true, clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Stripe create-intent error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// ─────────────────────────────────────────────────────────────────────────
// POST /api/payment/paypal/create-order
// Optional: server-side PayPal order creation (frontend SDK handles this
// automatically via createOrder callback — this route is available if needed)
// Body: { amount: Number, description: String }
// ─────────────────────────────────────────────────────────────────────────
router.post('/paypal/create-order', async (req, res) => {
  try {
    const { amount, description = 'EPC Assessment' } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    const client  = getPayPalClient()
    const request = new paypal.orders.OrdersCreateRequest()
    request.prefer('return=representation')
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { currency_code: 'GBP', value: amount.toFixed(2) },
        description,
      }],
    })

    const order = await client.execute(request)
    res.json({ success: true, orderId: order.result.id })
  } catch (error) {
    console.error('PayPal create-order error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// ─────────────────────────────────────────────────────────────────────────
// POST /api/payment/paypal/capture-order
// Called after user approves payment on PayPal — captures the funds
// Body: { orderId: String }
// ─────────────────────────────────────────────────────────────────────────
router.post('/paypal/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body
    if (!orderId) return res.status(400).json({ success: false, message: 'Missing orderId' })

    const client  = getPayPalClient()
    const request = new paypal.orders.OrdersCaptureRequest(orderId)
    request.requestBody({})

    const capture = await client.execute(request)
    res.json({ success: true, details: capture.result })
  } catch (error) {
    console.error('PayPal capture-order error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router