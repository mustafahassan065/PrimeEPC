// routes/email.js
// npm install nodemailer
const express  = require('express')
const nodemailer = require('nodemailer')
const router   = express.Router()

// ── SMTP config — mustafaprogrammer786@gmail.com ──────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mustafaprogrammer786@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD   // add to .env: GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
  }
})

const ADMIN_EMAIL = 'info@primeepcdesign.co.uk'
const FROM_EMAIL  = '"Prime EPC" <mustafaprogrammer786@gmail.com>'

// ─────────────────────────────────────────────────────────────────────────
// POST /api/email/send-booking-confirmation
// Called after booking is saved — sends emails to admin + user
// Body: { name, email, phone, propertyType, propertyDetails, postcode,
//         propertyAddress, preferredDate, message, paymentMethod, amount }
// ─────────────────────────────────────────────────────────────────────────
router.post('/send-booking-confirmation', async (req, res) => {
  try {
    const {
      name, email, phone, propertyType, propertyDetails,
      postcode, propertyAddress, preferredDate, message,
      paymentMethod, amount, paymentRef, paymentStatus
    } = req.body

    // Bot check — honeypot (should never reach here but extra safety)
    if (req.body.honeypot) return res.json({ success: true })

    const dateStr = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      : 'Not specified'

    const paymentLabel = {
      cash:   'Cash (Pay on Arrival)',
      stripe: 'Bank Card (Stripe)',
      paypal: 'PayPal'
    }[paymentMethod] || paymentMethod

    const amountStr = amount ? `£${amount}` : 'To be confirmed'

    // ── Invoice section (only for cash) ──────────────────────────────────
    const invoiceSection = paymentMethod === 'cash' ? `
      <div style="margin-top:24px; padding:16px; background:#fffbeb; border:1px solid #f59e0b; border-radius:8px;">
        <h3 style="color:#b45309; margin:0 0 8px;">📄 Invoice / Payment Due</h3>
        <p style="margin:4px 0; color:#374151;"><strong>Amount Due:</strong> ${amountStr}</p>
        <p style="margin:4px 0; color:#374151;"><strong>Payment Method:</strong> Cash on Arrival</p>
        <p style="margin:4px 0; color:#374151;">Please have the exact amount ready on the day of your assessment.</p>
      </div>` : `
      <div style="margin-top:24px; padding:16px; background:#f0fdf4; border:1px solid #86efac; border-radius:8px;">
        <h3 style="color:#166534; margin:0 0 8px;">✅ Payment Received</h3>
        <p style="margin:4px 0; color:#374151;"><strong>Amount Paid:</strong> ${amountStr}</p>
        <p style="margin:4px 0; color:#374151;"><strong>Payment Method:</strong> ${paymentLabel}</p>
        ${paymentRef ? `<p style="margin:4px 0; color:#374151;"><strong>Reference:</strong> ${paymentRef}</p>` : ''}
      </div>`

    // ── Email to ADMIN ────────────────────────────────────────────────────
    const adminHtml = `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background:#016837; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:white; margin:0; font-size:22px;">🗓️ New Booking Received</h1>
        </div>
        <div style="background:#f9fafb; padding:24px; border:1px solid #e5e7eb; border-top:none; border-radius:0 0 8px 8px;">
          <h2 style="color:#016837; margin-top:0;">Customer Details</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Name</td><td style="padding:6px 0; color:#111827; font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Email</td><td style="padding:6px 0; color:#111827; font-weight:600;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Phone</td><td style="padding:6px 0; color:#111827; font-weight:600;">${phone}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Service</td><td style="padding:6px 0; color:#111827; font-weight:600;">${propertyType} — ${propertyDetails}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Postcode</td><td style="padding:6px 0; color:#111827; font-weight:600;">${postcode}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Property Address</td><td style="padding:6px 0; color:#111827; font-weight:600;">${propertyAddress}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Appointment</td><td style="padding:6px 0; color:#016837; font-weight:700;">${dateStr}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Payment</td><td style="padding:6px 0; color:#111827; font-weight:600;">${paymentLabel} — ${amountStr}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Payment Status</td><td style="padding:6px 0; color:#111827; font-weight:600;">${paymentStatus || 'N/A'}</td></tr>
            ${paymentRef ? `<tr><td style="padding:6px 0; color:#6b7280;">Payment Ref</td><td style="padding:6px 0; color:#111827; font-weight:600;">${paymentRef}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:6px 0; color:#6b7280; vertical-align:top;">Notes</td><td style="padding:6px 0; color:#111827;">${message}</td></tr>` : ''}
          </table>
        </div>
      </div>`

    // ── Confirmation email to USER ─────────────────────────────────────────
    const userHtml = `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background:#016837; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:white; margin:0; font-size:22px;">✅ Booking Confirmed — Prime EPC</h1>
        </div>
        <div style="background:#f9fafb; padding:24px; border:1px solid #e5e7eb; border-top:none; border-radius:0 0 8px 8px;">
          <p style="color:#374151;">Dear <strong>${name}</strong>,</p>
          <p style="color:#374151;">Thank you for booking with <strong>Prime EPC and Design Consultants</strong>. Your appointment has been confirmed.</p>

          <div style="background:white; padding:16px; border-radius:8px; border:1px solid #e5e7eb; margin:16px 0;">
            <h3 style="color:#016837; margin-top:0;">📋 Booking Summary</h3>
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:5px 0; color:#6b7280; width:40%;">Service</td><td style="padding:5px 0; color:#111827; font-weight:600;">${propertyDetails}</td></tr>
              <tr><td style="padding:5px 0; color:#6b7280;">Property Address</td><td style="padding:5px 0; color:#111827; font-weight:600;">${propertyAddress}</td></tr>
              <tr><td style="padding:5px 0; color:#6b7280;">Postcode</td><td style="padding:5px 0; color:#111827; font-weight:600;">${postcode}</td></tr>
              <tr><td style="padding:5px 0; color:#6b7280;">Appointment</td><td style="padding:5px 0; color:#016837; font-weight:700;">${dateStr}</td></tr>
              <tr><td style="padding:5px 0; color:#6b7280;">Payment</td><td style="padding:5px 0; color:#111827; font-weight:600;">${paymentLabel}</td></tr>
            </table>
          </div>

          ${invoiceSection}

          <div style="margin-top:24px; padding:16px; background:#f0fdf4; border-radius:8px;">
            <h3 style="color:#016837; margin:0 0 8px;">📞 Need Help?</h3>
            <p style="margin:4px 0; color:#374151;">📞 07308658247</p>
            <p style="margin:4px 0; color:#374151;">📧 info@primeepcdesign.co.uk</p>
            <p style="margin:4px 0; color:#374151;">🌐 https://www.primeepcdesign.co.uk</p>
          </div>

          <p style="color:#6b7280; font-size:13px; margin-top:20px;">
            If you need to reschedule or have any questions, please contact us as soon as possible.
          </p>
          <p style="color:#016837; font-weight:600;">Prime EPC and Design Consultants</p>
        </div>
      </div>`

    // Send both emails
    await Promise.all([
      transporter.sendMail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Booking — ${name} — ${dateStr}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: 'Booking Confirmed — Prime EPC and Design Consultants',
        html: userHtml
      })
    ])

    res.json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Booking email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// ─────────────────────────────────────────────────────────────────────────
// POST /api/email/send-contact-form
// Body: { name, email, phone, service, message }
// Bot protection: honeypot checked in frontend; rate limiting via express-rate-limit
// ─────────────────────────────────────────────────────────────────────────
router.post('/send-contact-form', async (req, res) => {
  try {
    const { name, email, phone, service, message, honeypot } = req.body

    // Server-side honeypot check
    if (honeypot) return res.json({ success: true })

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' })
    }

    // ── Email to ADMIN ────────────────────────────────────────────────────
    const adminHtml = `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background:#016837; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:white; margin:0; font-size:22px;">📩 New Contact Form Submission</h1>
        </div>
        <div style="background:#f9fafb; padding:24px; border:1px solid #e5e7eb; border-top:none; border-radius:0 0 8px 8px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#6b7280; width:30%;">Name</td><td style="padding:6px 0; color:#111827; font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Email</td><td style="padding:6px 0; color:#111827; font-weight:600;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Phone</td><td style="padding:6px 0; color:#111827; font-weight:600;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Service</td><td style="padding:6px 0; color:#111827; font-weight:600;">${service || 'Not specified'}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280; vertical-align:top;">Message</td><td style="padding:6px 0; color:#111827;">${message}</td></tr>
          </table>
        </div>
      </div>`

    // ── Confirmation to USER ───────────────────────────────────────────────
    const userHtml = `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background:#016837; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:white; margin:0; font-size:22px;">✅ Message Received — Prime EPC</h1>
        </div>
        <div style="background:#f9fafb; padding:24px; border:1px solid #e5e7eb; border-top:none; border-radius:0 0 8px 8px;">
          <p style="color:#374151;">Dear <strong>${name}</strong>,</p>
          <p style="color:#374151;">Thank you for contacting <strong>Prime EPC and Design Consultants</strong>. We have received your message and will get back to you within 24 hours.</p>

          <div style="background:white; padding:16px; border-radius:8px; border:1px solid #e5e7eb; margin:16px 0;">
            <h3 style="color:#016837; margin-top:0;">Your Message</h3>
            <p style="color:#374151; white-space:pre-wrap;">${message}</p>
          </div>

          <div style="margin-top:16px; padding:16px; background:#f0fdf4; border-radius:8px;">
            <h3 style="color:#016837; margin:0 0 8px;">Contact Us Directly</h3>
            <p style="margin:4px 0; color:#374151;">📞 07308658247</p>
            <p style="margin:4px 0; color:#374151;">📧 info@primeepcdesign.co.uk</p>
            <p style="margin:4px 0; color:#374151;">🌐 https://www.primeepcdesign.co.uk</p>
          </div>
          <p style="color:#016837; font-weight:600; margin-top:20px;">Prime EPC and Design Consultants</p>
        </div>
      </div>`

    await Promise.all([
      transporter.sendMail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Contact Form — ${name} — ${service || 'General Enquiry'}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your message — Prime EPC',
        html: userHtml
      })
    ])

    res.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router