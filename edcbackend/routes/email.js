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

    if (req.body.honeypot) return res.json({ success: true })

    const dateObj = preferredDate ? new Date(preferredDate) : null
    const dateStr = dateObj
      ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      : 'Not specified'
    const timeStr = dateObj
      ? dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false })
      : ''

    const paymentLabel = {
      cash: 'Cash (Pay on Arrival)',
      stripe: 'Bank Card (Stripe)',
      paypal: 'PayPal',
      bank_transfer: 'Bank Transfer (Invoice)'
    }[paymentMethod] || paymentMethod

    const amountStr = amount ? `£${amount}` : 'To be confirmed'
    const service = propertyDetails || propertyType || 'EPC Assessment'

    // ── USER confirmation email ───────────────────────────────────────────
    const userHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;border-radius:8px;overflow:hidden;">

  <!-- HEADER: logo left, tagline right -->
  <tr><td style="background:#016837;padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;padding-right:20px;">
        <p style="margin:0;font-size:20px;font-weight:900;color:#ffffff;letter-spacing:0.5px;">Prime EPC</p>
        <p style="margin:3px 0 0;font-size:11px;color:#80C531;letter-spacing:1px;text-transform:uppercase;">and Design Consultants</p>
      </td>
      <td style="border-left:1px solid rgba(255,255,255,0.3);padding-left:20px;vertical-align:middle;">
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.7;">Your Property.<br>Our Expertise.<br><span style="color:#80C531;font-style:italic;font-weight:600;">A Greener Tomorrow.</span></p>
      </td>
    </tr></table>
  </td></tr>

  <!-- BOOKING CONFIRMED BANNER -->
  <tr><td style="padding:32px 28px 20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="width:64px;height:64px;background:#016837;border-radius:50%;text-align:center;vertical-align:middle;">
        <span style="color:white;font-size:32px;line-height:64px;">&#10003;</span>
      </td>
      <td style="padding-left:18px;vertical-align:middle;">
        <h1 style="margin:0;font-size:30px;font-weight:900;color:#016837;line-height:1.15;">Booking<br>Confirmed!</h1>
      </td>
    </tr></table>
    <p style="margin:20px 0 4px;font-size:14px;color:#374151;">Hi <strong>${name}</strong>,</p>
    <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111827;">Thank you for choosing Prime EPC &amp; Design Consultants.</p>
    <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Your appointment has been successfully confirmed.</p>
    <p style="margin:10px 0 0;font-size:13px;color:#6b7280;">We look forward to visiting your property and helping you with your EPC assessment.</p>
  </td></tr>

  <!-- BOOKING DETAILS CARD -->
  <tr><td style="padding:0 28px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #d1ead8;border-radius:10px;overflow:hidden;">
      <!-- Card header -->
      <tr><td style="padding:14px 18px;border-bottom:1px solid #d1ead8;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;height:32px;background:#016837;border-radius:6px;text-align:center;vertical-align:middle;font-size:16px;">&#128197;</td>
          <td style="padding-left:10px;font-size:13px;font-weight:800;color:#016837;text-transform:uppercase;letter-spacing:0.5px;border-left:3px solid #016837;padding-left:10px;">BOOKING DETAILS</td>
        </tr></table>
      </td></tr>
      <!-- Service -->
      <tr><td style="padding:14px 18px;border-bottom:1px solid #e8f4ee;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#e8f5e9;border-radius:50%;text-align:center;vertical-align:middle;font-size:18px;">&#128295;</td>
          <td style="padding-left:12px;"><p style="margin:0;font-size:11px;color:#6b7280;">Service</p><p style="margin:3px 0 0;font-size:14px;font-weight:700;color:#111827;">${service}</p></td>
        </tr></table>
      </td></tr>
      <!-- Address -->
      <tr><td style="padding:14px 18px;border-bottom:1px solid #e8f4ee;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#e8f5e9;border-radius:50%;text-align:center;vertical-align:middle;font-size:18px;">&#127968;</td>
          <td style="padding-left:12px;"><p style="margin:0;font-size:11px;color:#6b7280;">Property Address</p><p style="margin:3px 0 0;font-size:14px;font-weight:700;color:#111827;">${propertyAddress},<br>${postcode}</p></td>
        </tr></table>
      </td></tr>
      <!-- Date -->
      <tr><td style="padding:14px 18px;border-bottom:1px solid #e8f4ee;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#e8f5e9;border-radius:50%;text-align:center;vertical-align:middle;font-size:18px;">&#128197;</td>
          <td style="padding-left:12px;"><p style="margin:0;font-size:11px;color:#6b7280;">Date</p><p style="margin:3px 0 0;font-size:14px;font-weight:700;color:#111827;">${dateStr}</p></td>
        </tr></table>
      </td></tr>
      <!-- Time -->
      <tr><td style="padding:14px 18px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#e8f5e9;border-radius:50%;text-align:center;vertical-align:middle;font-size:18px;">&#128336;</td>
          <td style="padding-left:12px;"><p style="margin:0;font-size:11px;color:#6b7280;">Time</p><p style="margin:3px 0 0;font-size:14px;font-weight:700;color:#111827;">${timeStr}</p></td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ADD TO CALENDAR BUTTON -->
  <tr><td style="padding:0 28px 24px;" align="center">
    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=EPC+Assessment+%E2%80%94+Prime+EPC&details=Your+EPC+assessment+with+Prime+EPC+%26+Design+Consultants.+Contact%3A+07308658247&location=${encodeURIComponent(propertyAddress + ', ' + postcode)}&dates=${dateObj ? dateObj.toISOString().replace(/-|:|\.\d+/g,'').slice(0,15) + '00Z/' + new Date(dateObj.getTime()+3600000).toISOString().replace(/-|:|\.\d+/g,'').slice(0,15) + '00Z' : ''}" target="_blank" style="display:inline-block;background:#016837;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:30px;">
      &#128197; Add to Calendar
    </a>
  </td></tr>

  <!-- NEED CHANGES BOX -->
  <tr><td style="padding:0 28px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #d1ead8;border-left:4px solid #016837;border-radius:0 8px 8px 0;padding:14px 18px;">
      <tr><td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="font-size:20px;">&#127807;</td>
          <td style="padding-left:10px;"><p style="margin:0;font-size:13px;font-weight:700;color:#111827;">Need to make changes?</p><p style="margin:3px 0 0;font-size:12px;color:#6b7280;">Just reply to this email or get in touch with our team.</p></td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- FOOTER TRUST BAR -->
  <tr><td style="background:#014d28;padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="text-align:center;padding:0 6px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">&#128737;</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Trusted Experts</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">Accurate &amp; Compliant</p>
      </td>
      <td style="text-align:center;padding:0 6px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">&#127807;</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Energy Efficient</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">A Greener Future</p>
      </td>
      <td style="text-align:center;padding:0 6px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">&#127968;</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Local Service</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">Bolton &amp; Surrounding Areas</p>
      </td>
      <td style="text-align:center;padding:0 6px;">
        <p style="margin:0;font-size:10px;font-weight:900;color:#80C531;">PRIME EPC</p>
        <p style="margin:2px 0 0;font-size:8px;color:rgba(255,255,255,0.5);">&amp; Design Consultants</p>
      </td>
    </tr></table>
  </td></tr>

</table>
</td></tr></table>
</body></html>`

    // ── ADMIN notification email ───────────────────────────────────────────
    const adminHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;border-radius:8px;overflow:hidden;">

  <!-- ADMIN HEADER -->
  <tr><td style="background:#016837;padding:16px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;padding-right:16px;">
        <p style="margin:0;font-size:18px;font-weight:900;color:#ffffff;">Prime EPC</p>
        <p style="margin:3px 0 0;font-size:10px;color:#80C531;letter-spacing:1px;text-transform:uppercase;">and Design Consultants</p>
      </td>
      <td style="padding-left:16px;border-left:1px solid rgba(255,255,255,0.3);vertical-align:middle;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.7);">Property Assessments &amp; Compliance</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- NEW BOOKING BANNER -->
  <tr><td style="background:#014d28;padding:14px 24px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="width:40px;height:40px;background:rgba(255,255,255,0.1);border-radius:8px;text-align:center;vertical-align:middle;font-size:20px;">&#128197;</td>
      <td style="padding-left:12px;">
        <h1 style="margin:0;font-size:18px;font-weight:900;color:#ffffff;">New Booking Received</h1>
        <p style="margin:2px 0 0;font-size:10px;color:#80C531;text-transform:uppercase;letter-spacing:1px;">Customer Details</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- CUSTOMER DETAILS TABLE -->
  <tr><td style="padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr><td colspan="2" style="background:#f9fafb;padding:10px 16px;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#016837;text-transform:uppercase;letter-spacing:0.5px;">&#128100; Customer Info</p>
      </td></tr>
      ${[
        ['&#128100;','Name', name],
        ['&#9993;','Email', email],
        ['&#128222;','Phone', phone],
        ['&#128295;','Service', service + (amount ? ' &#8212; &#163;' + amount : '')],
        ['&#128205;','Postcode', postcode],
        ['&#127968;','Address', propertyAddress],
        ['&#128197;','Date', dateStr],
        ['&#128336;','Time', timeStr],
        ['&#128179;','Payment', paymentLabel],
        ['&#128278;','Status', paymentStatus || 'Pending'],
        ...(message ? [['&#128221;','Notes', message]] : []),
      ].map(([icon, label, val], i) => `
      <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding:10px 16px;width:38%;color:#6b7280;font-size:12px;border-bottom:1px solid #f3f4f6;">${icon} ${label}</td>
        <td style="padding:10px 16px;color:#111827;font-weight:600;font-size:12px;border-bottom:1px solid #f3f4f6;">${val || 'N/A'}</td>
      </tr>`).join('')}
    </table>

    <!-- CONFIRM NOTE -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;background:#f0fdf4;border-left:4px solid #016837;border-radius:0 6px 6px 0;">
      <tr><td style="padding:12px 16px;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#016837;">&#128737; Please confirm with the customer</p>
        <p style="margin:3px 0 0;font-size:11px;color:#4b7a5e;">Ensure all details are updated in your system.</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- ADMIN FOOTER -->
  <tr><td style="background:#014d28;padding:12px 24px;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">&#128222; 07308 658247 &nbsp;|&nbsp; &#9993; info@primeepcdesign.co.uk &nbsp;|&nbsp; &#127760; primeepcdesign.co.uk</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`

    // Send both emails
    await Promise.all([
      transporter.sendMail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Booking \u2014 ${name} \u2014 ${dateStr}`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: 'Booking Confirmed \u2014 Prime EPC and Design Consultants',
        html: userHtml
      })
    ])

    res.json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Booking email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})


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

// ─────────────────────────────────────────────────────────────────────────
// POST /api/email/send-booking-update
// Admin booking edit kare — customer ko updated details email jaye
// ─────────────────────────────────────────────────────────────────────────
router.post('/send-booking-update', async (req, res) => {
  try {
    const { name, email, phone, propertyType, propertyDetails,
            propertyAddress, postcode, preferredDate,
            paymentMethod, amount, status } = req.body

    if (!email) return res.json({ success: true })

    const dateStr = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      : 'To be confirmed'

    const amountStr    = amount ? `£${amount}` : 'To be confirmed'
    const paymentLabel = { cash: 'Cash (Pay on Arrival)', stripe: 'Bank Card', paypal: 'PayPal', bank_transfer: 'Bank Transfer' }[paymentMethod] || paymentMethod || 'Cash'
    const statusLabel  = { pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' }[status] || status

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#016837;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">📋 Booking Updated — Prime EPC</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <p style="color:#374151;margin:0 0 12px;">Dear <strong>${name}</strong>,</p>
          <p style="color:#374151;margin:0 0 16px;">Your booking details have been updated by our team. Please find the updated information below:</p>

          <div style="background:white;padding:16px;border-radius:8px;border:1px solid #e5e7eb;margin:0 0 16px;">
            <h3 style="color:#016837;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Updated Booking Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:13px;width:40%;">Service</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;font-size:13px;">${propertyDetails || propertyType}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:13px;">Property Address</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;font-size:13px;">${propertyAddress || ''}, ${postcode || ''}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:13px;">Assessment Date</td>
                <td style="padding:8px 0;color:#016837;font-weight:700;font-size:13px;">${dateStr}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:13px;">Amount</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;font-size:13px;">${amountStr}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:13px;">Payment Method</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;font-size:13px;">${paymentLabel}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:13px;">Booking Status</td>
                <td style="padding:8px 0;color:#016837;font-weight:700;font-size:13px;">${statusLabel}</td>
              </tr>
            </table>
          </div>

          <div style="padding:14px;background:#f0fdf4;border-radius:8px;margin-bottom:16px;">
            <p style="margin:0 0 6px;color:#374151;font-size:13px;">If you have any questions about your updated booking, please contact us:</p>
            <p style="margin:3px 0;color:#374151;font-size:13px;">📞 07308658247</p>
            <p style="margin:3px 0;color:#374151;font-size:13px;">📧 info@primeepcdesign.co.uk</p>
            <p style="margin:3px 0;color:#374151;font-size:13px;">🌐 https://www.primeepcdesign.co.uk</p>
          </div>

          <p style="color:#016837;font-weight:600;margin:0;">Prime EPC and Design Consultants</p>
          <p style="color:#9ca3af;font-size:11px;margin:4px 0 0;">Company No. 17307524</p>
        </div>
      </div>`

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Booking Updated — Prime EPC and Design Consultants',
      html
    })

    res.json({ success: true, message: 'Update email sent successfully' })
  } catch (error) {
    console.error('Booking update email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router