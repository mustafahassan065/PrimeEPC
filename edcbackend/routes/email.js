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
      paymentMethod, paymentStatus, amount, paymentRef,
      invoiceNo, pdfBase64   // pdfBase64 = frontend se bani PDF (invoice editor wali)
    } = req.body

    if (!email) return res.status(400).json({ success: false, message: 'Email is required' })

    const dateStr = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      : 'To be confirmed'

    const amountStr = amount ? `£${Number(amount).toFixed(2)}` : 'To be confirmed'
    const invNo = invoiceNo || `INV-${Date.now().toString().slice(-8)}`

    const paymentLabel = {
      cash:          'Cash',
      stripe:        'Bank Card',
      paypal:        'PayPal',
      bank_transfer: 'Bank Transfer'
    }[paymentMethod] || paymentMethod || 'Cash'

    const statusLabel = paymentStatus === 'paid' ? 'Paid' : 'Pending'

    // ── Short email body — asli invoice PDF attachment mein hai ──────────
    const emailHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;border-radius:12px;overflow:hidden;">

  <!-- HEADER -->
  <tr><td style="background:#016837;padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <p style="margin:0;font-size:20px;font-weight:900;color:#ffffff;letter-spacing:0.5px;">Prime EPC</p>
        <p style="margin:3px 0 0;font-size:11px;color:#80C531;letter-spacing:1px;text-transform:uppercase;">and Design Consultants</p>
      </td>
      <td align="right" style="vertical-align:middle;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.8);">Invoice ${invNo}</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- BODY -->
  <tr><td style="padding:28px 24px;">
    <h1 style="margin:0 0 14px;font-size:22px;font-weight:900;color:#016837;">Your Invoice is Ready &#128229;</h1>
    <p style="margin:0 0 4px;font-size:14px;color:#374151;">Dear <strong>${name}</strong>,</p>
    <p style="margin:0 0 16px;font-size:13px;color:#6b7280;line-height:1.6;">
      Please find your invoice attached as a <strong>PDF file</strong>. Download the attachment to view and keep it for your records.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #d1ead8;border-radius:10px;overflow:hidden;margin-bottom:16px;">
      <tr><td style="padding:12px 18px;border-bottom:2px solid #016837;">
        <p style="margin:0;font-size:12px;font-weight:800;color:#016837;text-transform:uppercase;letter-spacing:0.5px;">Invoice Summary</p>
      </td></tr>
      <tr><td style="padding:12px 18px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr style="border-bottom:1px solid #e8f4ee;">
            <td style="padding:7px 0;color:#6b7280;font-size:12px;width:42%;">Invoice Number</td>
            <td style="padding:7px 0;color:#111827;font-weight:700;font-size:12px;">${invNo}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8f4ee;">
            <td style="padding:7px 0;color:#6b7280;font-size:12px;">Service</td>
            <td style="padding:7px 0;color:#111827;font-weight:700;font-size:12px;">${propertyDetails || propertyType || 'EPC Assessment'}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8f4ee;">
            <td style="padding:7px 0;color:#6b7280;font-size:12px;">Assessment Date</td>
            <td style="padding:7px 0;color:#111827;font-weight:700;font-size:12px;">${dateStr}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8f4ee;">
            <td style="padding:7px 0;color:#6b7280;font-size:12px;">Payment Method</td>
            <td style="padding:7px 0;color:#111827;font-weight:700;font-size:12px;">${paymentLabel}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8f4ee;">
            <td style="padding:7px 0;color:#6b7280;font-size:12px;">Payment Status</td>
            <td style="padding:7px 0;color:${paymentStatus === 'paid' ? '#22c55e' : '#eab308'};font-weight:700;font-size:12px;">${statusLabel}</td>
          </tr>
          <tr>
            <td style="padding:7px 0;color:#6b7280;font-size:12px;">Total Amount</td>
            <td style="padding:7px 0;color:#016837;font-weight:900;font-size:15px;">${amountStr}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #d1ead8;border-left:4px solid #016837;border-radius:0 8px 8px 0;">
      <tr><td style="padding:14px 18px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:#111827;">&#128229; PDF Attachment</p>
        <p style="margin:3px 0 0;font-size:12px;color:#6b7280;line-height:1.5;">Your full invoice is attached to this email as <strong>Invoice-${invNo}.pdf</strong>. Please download the attachment.</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#014d28;padding:16px 24px;">
    <p style="margin:0 0 3px;font-size:12px;color:#ffffff;font-weight:700;">Prime EPC and Design Consultants</p>
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.6);">&#128222; 07308658247 &nbsp;|&nbsp; &#9993; info@primeepcdesign.co.uk &nbsp;|&nbsp; &#127760; www.primeepcdesign.co.uk</p>
    <p style="margin:4px 0 0;font-size:10px;color:rgba(255,255,255,0.4);">Company No. 17307524</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`

    // ── PDF attachment (frontend invoice editor se aayi hui) ─────────────
    const attachments = []
    if (pdfBase64) {
      attachments.push({
        filename: `Invoice-${invNo}.pdf`,
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf'
      })
    }

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `Invoice ${invNo} — Prime EPC Assessment — ${amountStr}`,
      html: emailHtml,
      attachments
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


// ─────────────────────────────────────────────────────────────────────────
// POST /api/email/send-bulk-epc — Bulk EPC quote request
// ─────────────────────────────────────────────────────────────────────────
router.post('/send-bulk-epc', async (req, res) => {
  try {
    const { name, email, phone, propertyType, numberOfProperties, postcodes, additionalInfo } = req.body
    if (!name || !email || !phone) return res.status(400).json({ success: false, message: 'Name, email and phone are required' })

    const propTypeLabel = {
      domestic: 'Domestic (Houses/Flats)', commercial: 'Commercial',
      hmo: 'HMO', mixed: 'Mixed (Domestic + Commercial)', 'new-build': 'New Build'
    }[propertyType] || propertyType

    // ── Admin notification ─────────────────────────────────────────────
    const adminHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
  <tr><td style="background:#016837;padding:16px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><p style="margin:0;font-size:18px;font-weight:900;color:#ffffff;">PRIME EPC</p><p style="margin:2px 0 0;font-size:10px;color:#80C531;text-transform:uppercase;letter-spacing:1px;">and Design Consultants</p></td>
      <td align="right"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.7);">Bulk EPC Portal</p></td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#014d28;padding:14px 24px;">
    <h1 style="margin:0;font-size:18px;font-weight:900;color:#ffffff;">📦 New Bulk EPC Quote Request</h1>
    <p style="margin:2px 0 0;font-size:10px;color:#80C531;text-transform:uppercase;letter-spacing:1px;">Review and respond within 1 working day</p>
  </td></tr>
  <tr><td style="padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr><td colspan="2" style="background:#f9fafb;padding:10px 16px;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#016837;text-transform:uppercase;">Quote Details</td></tr>
      ${[
        ['👤','Name', name],
        ['✉️','Email', email],
        ['📞','Phone', phone],
        ['🏠','Property Type', propTypeLabel],
        ['🔢','Number of Properties', numberOfProperties],
        ['📍','Postcodes / Areas', postcodes || 'Not specified'],
        ...(additionalInfo ? [['📝','Additional Info', additionalInfo]] : []),
      ].map(([icon, label, val]) => `
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:10px 16px;width:38%;color:#6b7280;font-size:12px;">${icon} ${label}</td>
        <td style="padding:10px 16px;color:#111827;font-weight:600;font-size:12px;">${val}</td>
      </tr>`).join('')}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;background:#f0fdf4;border-left:4px solid #016837;border-radius:0 6px 6px 0;">
      <tr><td style="padding:12px 16px;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#016837;">🛡️ Action required</p>
        <p style="margin:3px 0 0;font-size:11px;color:#4b7a5e;">Please respond to this quote request within 1 working day.</p>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="background:#014d28;padding:12px 24px;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">📞 07308 658247 | ✉️ info@primeepcdesign.co.uk</p>
  </td></tr>
</table></td></tr></table></body></html>`

    // ── Customer confirmation ──────────────────────────────────────────
    const userHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
  <tr><td style="background:#016837;padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><p style="margin:0;font-size:20px;font-weight:900;color:#ffffff;">PRIME EPC</p><p style="margin:2px 0 0;font-size:11px;color:#80C531;letter-spacing:1.5px;text-transform:uppercase;">and Design Consultants</p></td>
      <td align="right"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.8);line-height:1.7;">Your Property.<br>Our Expertise.<br><span style="color:#80C531;font-style:italic;">A Greener Tomorrow.</span></p></td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:28px 24px 20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="width:60px;height:60px;background:#016837;border-radius:50%;text-align:center;vertical-align:middle;">
        <span style="color:white;font-size:28px;line-height:60px;">✓</span>
      </td>
      <td style="padding-left:16px;vertical-align:middle;">
        <h1 style="margin:0;font-size:26px;font-weight:900;color:#016837;line-height:1.2;">Quote Request<br>Received!</h1>
      </td>
    </tr></table>
    <p style="margin:16px 0 4px;font-size:14px;color:#374151;">Hi <strong>${name}</strong>,</p>
    <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111827;">Thank you for your bulk EPC quote request.</p>
    <p style="margin:4px 0 16px;font-size:13px;color:#6b7280;">We have received your request and will get back to you within <strong>1 working day</strong> with a tailored quote.</p>
  </td></tr>
  <tr><td style="padding:0 24px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #d1ead8;border-radius:10px;overflow:hidden;">
      <tr><td style="padding:14px 18px;border-bottom:2px solid #016837;">
        <p style="margin:0;font-size:13px;font-weight:800;color:#016837;text-transform:uppercase;letter-spacing:0.5px;">📦 Your Quote Summary</p>
      </td></tr>
      <tr><td style="padding:12px 18px;border-bottom:1px solid #e8f4ee;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="width:28px;font-size:16px;">🏠</td><td style="padding-left:10px;width:38%;color:#6b7280;font-size:13px;">Property Type</td><td style="color:#111827;font-weight:600;font-size:13px;">${propTypeLabel}</td></tr></table></td></tr>
      <tr><td style="padding:12px 18px;border-bottom:1px solid #e8f4ee;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="width:28px;font-size:16px;">🔢</td><td style="padding-left:10px;width:38%;color:#6b7280;font-size:13px;">No. of Properties</td><td style="color:#111827;font-weight:600;font-size:13px;">${numberOfProperties}</td></tr></table></td></tr>
      <tr><td style="padding:12px 18px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="width:28px;font-size:16px;">📍</td><td style="padding-left:10px;width:38%;color:#6b7280;font-size:13px;">Areas</td><td style="color:#111827;font-weight:600;font-size:13px;">${postcodes || 'Not specified'}</td></tr></table></td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background:#f8fffe;border:1px solid #d1ead8;border-left:4px solid #016837;border-radius:0 8px 8px 0;padding:14px 18px;">
      <tr><td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="font-size:20px;">🌿</td>
          <td style="padding-left:10px;"><p style="margin:0;font-size:13px;font-weight:700;color:#111827;">What happens next?</p><p style="margin:3px 0 0;font-size:12px;color:#6b7280;">Our team will review your request and contact you within 1 working day with a tailored quote and next steps.</p></td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="background:#014d28;padding:20px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="text-align:center;padding:0 8px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">🛡️</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Trusted Experts</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">Accredited &amp; Compliant</p>
      </td>
      <td style="text-align:center;padding:0 8px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">💰</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Bulk Savings</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">Discounted Rates</p>
      </td>
      <td style="text-align:center;padding:0 8px;border-right:1px solid rgba(255,255,255,0.15);">
        <p style="margin:0;font-size:18px;">⚡</p>
        <p style="margin:4px 0 0;font-size:10px;font-weight:700;color:#80C531;">Fast Turnaround</p>
        <p style="margin:2px 0 0;font-size:9px;color:rgba(255,255,255,0.5);">24-48 Hours</p>
      </td>
      <td style="text-align:center;padding:0 8px;">
        <p style="margin:0;font-size:10px;font-weight:900;color:#80C531;">PRIME EPC</p>
        <p style="margin:2px 0 0;font-size:8px;color:rgba(255,255,255,0.5);">&amp; Design Consultants</p>
      </td>
    </tr></table>
  </td></tr>
</table></td></tr></table></body></html>`

    await Promise.all([
      transporter.sendMail({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Bulk EPC Quote — ${name} — ${numberOfProperties} properties`,
        html: adminHtml
      }),
      transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: 'Bulk EPC Quote Request Received — Prime EPC and Design Consultants',
        html: userHtml
      })
    ])

    res.json({ success: true, message: 'Quote request submitted successfully' })
  } catch (error) {
    console.error('Bulk EPC email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router