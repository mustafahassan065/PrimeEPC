// routes/email.js
// npm install nodemailer
const express  = require('express')
const nodemailer = require('nodemailer')
const router   = express.Router()

// ── SMTP config — Hostinger domain email ─────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@primeepcdesign.co.uk',
    pass: process.env.DOMAIN_EMAIL_PASSWORD  // .env mein: DOMAIN_EMAIL_PASSWORD=YOUR_PASSWORD_HERE
  }
})

const ADMIN_EMAIL = 'info@primeepcdesign.co.uk'
const FROM_EMAIL  = '"Prime EPC and Design Consultants" <info@primeepcdesign.co.uk>'

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
      paypal: 'PayPal',
      bank_transfer: 'Bank Transfer (Invoice)'
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


// ─────────────────────────────────────────────────────────────────────────
// POST /api/email/send-invoice
// Admin click kare "Send Invoice" button par — invoice email user ko jaye
// Body: { name, email, phone, propertyType, propertyDetails, propertyAddress,
//         postcode, preferredDate, paymentMethod, paymentStatus, amount, paymentRef }
// ─────────────────────────────────────────────────────────────────────────
router.post('/send-invoice', async (req, res) => {
  try {
    const {
      name, email, phone, propertyType, propertyDetails,
      propertyAddress, postcode, preferredDate,
      paymentMethod, paymentStatus, amount, paymentRef
    } = req.body

    if (!email) return res.status(400).json({ success: false, message: 'Email is required' })

    const dateStr = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      : 'To be confirmed'

    const amountStr = amount ? `£${amount}` : 'To be confirmed'

    // Real bank details from invoice PDF
    const BANK_NAME    = 'Prime EPC & Design Consultant LTD'
    const SORT_CODE    = '04-06-05'
    const ACCOUNT_NO   = '32484734'
    const ACCOUNT_BANK = 'Tide business'

    const paymentLabel = {
      cash:          'Cash (Pay on Arrival)',
      stripe:        'Bank Card',
      paypal:        'PayPal',
      bank_transfer: 'Bank Transfer'
    }[paymentMethod] || paymentMethod || 'Cash'

    // Payment section — cash/bank_transfer gets bank details, stripe/paypal gets receipt
    const paymentSection = (paymentMethod === 'cash' || paymentMethod === 'bank_transfer') ? `
      <div style="margin:20px 0; padding:20px; background:#fffbeb; border:2px solid #f59e0b; border-radius:8px;">
        <h3 style="color:#b45309; margin:0 0 12px; font-size:16px;">💳 Payment Details</h3>
        <p style="margin:0 0 12px; color:#374151;">
          ${paymentMethod === 'cash'
            ? 'Your payment is due on the day of your assessment. Please have the exact amount ready.'
            : 'Please make your bank transfer using the details below before your assessment date.'}
        </p>
        <table style="width:100%; border-collapse:collapse; background:white; border-radius:6px; overflow:hidden;">
          <tr style="border-bottom:1px solid #fde68a;">
            <td style="padding:8px 12px; color:#6b7280; width:45%;">Amount Due</td>
            <td style="padding:8px 12px; color:#b45309; font-weight:700; font-size:18px;">${amountStr}</td>
          </tr>
          <tr style="border-bottom:1px solid #fde68a;">
            <td style="padding:8px 12px; color:#6b7280;">Payment Method</td>
            <td style="padding:8px 12px; color:#111827; font-weight:600;">${paymentLabel}</td>
          </tr>
          ${paymentMethod === 'bank_transfer' ? `
          <tr style="border-bottom:1px solid #fde68a;">
            <td style="padding:8px 12px; color:#6b7280;">Account Name</td>
            <td style="padding:8px 12px; color:#111827; font-weight:600;">${BANK_NAME}</td>
          </tr>
          <tr style="border-bottom:1px solid #fde68a;">
            <td style="padding:8px 12px; color:#6b7280;">Sort Code</td>
            <td style="padding:8px 12px; color:#111827; font-weight:600;">${SORT_CODE}</td>
          </tr>
          <tr style="border-bottom:1px solid #fde68a;">
            <td style="padding:8px 12px; color:#6b7280;">Account Number</td>
            <td style="padding:8px 12px; color:#111827; font-weight:600;">${ACCOUNT_NO}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px; color:#6b7280;">Bank</td>
            <td style="padding:8px 12px; color:#111827; font-weight:600;">${ACCOUNT_BANK}</td>
          </tr>` : ''}
        </table>
      </div>` : `
      <div style="margin:20px 0; padding:20px; background:#f0fdf4; border:2px solid #86efac; border-radius:8px;">
        <h3 style="color:#166534; margin:0 0 8px;">✅ Payment Received</h3>
        <p style="margin:4px 0; color:#374151;"><strong>Amount:</strong> ${amountStr}</p>
        <p style="margin:4px 0; color:#374151;"><strong>Method:</strong> ${paymentLabel}</p>
        ${paymentRef ? `<p style="margin:4px 0; color:#374151;"><strong>Reference:</strong> ${paymentRef}</p>` : ''}
        <p style="margin:8px 0 0; color:#166534; font-weight:600;">No further payment is required.</p>
      </div>`

    const invoiceHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:20px 0;">
<tr><td align="center">
<table width="660" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
<tr>

  <!-- LEFT GREEN SIDEBAR -->
  <td width="210" style="background:#016837;vertical-align:top;padding:24px 16px;">

    <!-- Brand Name -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-bottom:1px solid #1a7a45;padding-bottom:16px;">
      <tr><td align="center">
        <p style="margin:0;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:1px;">PRIME EPC</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:400;color:#80C531;letter-spacing:2px;text-transform:uppercase;">&amp; Design Consultants</p>
      </td></tr>
    </table>

    <!-- BILL TO -->
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#80C531;">BILL TO</p>
    <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#ffffff;">${name}</p>
    <p style="margin:0 0 3px;font-size:12px;color:#c8e6c9;">${phone || 'N/A'}</p>
    <p style="margin:0 0 20px;font-size:12px;color:#c8e6c9;line-height:1.5;">${propertyAddress || ''}, ${postcode || ''}</p>

    <!-- Contact -->
    <p style="margin:0 0 4px;font-size:11px;color:#c8e6c9;">Tel: 07308658247</p>
    <p style="margin:0 0 4px;font-size:11px;color:#c8e6c9;"><span style="color:#c8e6c9 !important;text-decoration:none !important;">info@primeepcdesign.co.uk</span></p>
    <p style="margin:0 0 20px;font-size:11px;color:#c8e6c9;"><span style="color:#c8e6c9 !important;text-decoration:none !important;">www.primeepcdesign.co.uk</span></p>

    <!-- Amount Due Box -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:#014d2a;border:1px solid #80C531;border-radius:6px;padding:12px;text-align:center;">
        <p style="margin:0 0 3px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#80C531;">AMOUNT DUE</p>
        <p style="margin:0 0 8px;font-size:28px;font-weight:900;color:#ffffff;">${amountStr}</p>
        <p style="margin:0 0 3px;font-size:9px;color:#80C531;">Payment Method</p>
        <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;">${paymentLabel}</p>
      </td></tr>
    </table>

  </td>

  <!-- RIGHT CONTENT -->
  <td style="vertical-align:top;padding:24px 24px;background:#ffffff;">

    <!-- INVOICE Header -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td><p style="margin:0;font-size:32px;font-weight:900;color:#111827;letter-spacing:3px;">INVOICE</p></td>
        <td align="right">
          <p style="margin:0 0 2px;font-size:11px;color:#6b7280;">Date: ${new Date().toLocaleDateString('en-GB')}</p>
          <p style="margin:0;font-size:11px;color:#6b7280;">Invoice #: INV-${Date.now().toString().slice(-8)}</p>
        </td>
      </tr>
    </table>

    <p style="color:#374151;font-size:12px;line-height:1.6;margin:0 0 14px;">
      Thank you for choosing <strong>Prime EPC and Design Consultants</strong>. Please find your invoice details below.
    </p>

    <!-- SERVICE DETAILS -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
      <tr><td style="background:#f0fdf4;padding:8px 12px;border-bottom:2px solid #016837;">
        <p style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#016837;">SERVICE DETAILS</p>
      </td></tr>
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:8px 12px;color:#6b7280;font-size:11px;width:38%;">Customer</td><td style="padding:8px 12px;color:#111827;font-size:12px;font-weight:700;">${name}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:8px 12px;color:#6b7280;font-size:11px;">Phone</td><td style="padding:8px 12px;color:#111827;font-size:12px;font-weight:700;">${phone || 'N/A'}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:8px 12px;color:#6b7280;font-size:11px;">Service</td><td style="padding:8px 12px;color:#111827;font-size:12px;font-weight:700;">${propertyDetails || propertyType}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:8px 12px;color:#6b7280;font-size:11px;">Property Address</td><td style="padding:8px 12px;color:#111827;font-size:12px;font-weight:700;">${propertyAddress}, ${postcode}</td></tr>
          <tr><td style="padding:8px 12px;color:#6b7280;font-size:11px;">Assessment Date</td><td style="padding:8px 12px;color:#016837;font-size:12px;font-weight:700;">${dateStr}</td></tr>
        </table>
      </td></tr>
    </table>

    <!-- TOTAL AMOUNT -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;background:#f0fdf4;border:1px solid #86efac;border-radius:6px;">
      <tr>
        <td style="padding:10px 14px;font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;">TOTAL AMOUNT</td>
        <td style="padding:10px 14px;text-align:right;font-size:20px;font-weight:900;color:#016837;">${amountStr}</td>
      </tr>
    </table>

    <!-- PAYMENT DETAILS -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
      <tr><td style="background:#f9fafb;padding:8px 12px;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#111827;">PAYMENT DETAILS</p>
      </td></tr>
      <tr><td style="padding:12px;">
        <p style="margin:0 0 10px;color:#374151;font-size:12px;line-height:1.5;">
          ${paymentMethod === 'cash'
            ? 'Your payment is due on the day of your assessment. Please have the exact amount ready.'
            : paymentMethod === 'bank_transfer'
            ? 'Please make your bank transfer using the details below before your assessment date.'
            : 'Your payment has been received. No further action is required.'}
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:6px 0;color:#6b7280;font-size:11px;width:45%;">Amount Due</td>
            <td style="padding:6px 0;color:#b45309;font-weight:700;font-size:15px;">${amountStr}</td>
          </tr>
          <tr style="border-bottom:${paymentMethod === 'bank_transfer' ? '1px solid #f3f4f6' : 'none'};">
            <td style="padding:6px 0;color:#6b7280;font-size:11px;">Payment Method</td>
            <td style="padding:6px 0;color:#111827;font-weight:600;font-size:12px;">${paymentLabel}</td>
          </tr>
          ${paymentMethod === 'bank_transfer' ? `
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:6px 0;color:#6b7280;font-size:11px;">Bank Name</td>
            <td style="padding:6px 0;color:#111827;font-weight:600;font-size:12px;">${ACCOUNT_BANK}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:6px 0;color:#6b7280;font-size:11px;">Account Name</td>
            <td style="padding:6px 0;color:#111827;font-weight:600;font-size:12px;">${BANK_NAME}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:6px 0;color:#6b7280;font-size:11px;">Sort Code</td>
            <td style="padding:6px 0;color:#111827;font-weight:700;font-size:12px;">${SORT_CODE}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6b7280;font-size:11px;">Account Number</td>
            <td style="padding:6px 0;color:#111827;font-weight:700;font-size:12px;">${ACCOUNT_NO}</td>
          </tr>` : ''}
        </table>
      </td></tr>
    </table>

    <!-- FOOTER -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:12px;">
      <tr><td align="center">
        <p style="margin:0 0 3px;font-size:11px;color:#016837;font-weight:700;">Prime EPC and Design Consultants</p>
        <p style="margin:0 0 3px;font-size:10px;color:#9ca3af;">07308658247 | info@primeepcdesign.co.uk | www.primeepcdesign.co.uk</p>
        <p style="margin:0;font-size:9px;color:#9ca3af;">Company No. 17307524</p>
      </td></tr>
    </table>

  </td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`

        await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `Invoice — Prime EPC Assessment — ${amountStr}`,
      html: invoiceHtml
    })

    res.json({ success: true, message: 'Invoice sent successfully' })
  } catch (error) {
    console.error('Invoice email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router