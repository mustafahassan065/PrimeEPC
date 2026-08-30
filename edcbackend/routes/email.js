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
    const isPaid = ['paid', 'invoice_sent'].includes(paymentStatus) === false &&
                   ['stripe', 'paypal'].includes(paymentMethod)

    // Dummy bank details — client will update these
    const BANK_NAME    = 'Prime EPC & Design Consultant Ltd'
    const SORT_CODE    = '00-00-00'
    const ACCOUNT_NO   = '00000000'
    const ACCOUNT_BANK = 'Example Bank'

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
      <div style="font-family:Arial,sans-serif; max-width:620px; margin:0 auto; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">

        <!-- Header -->
        <div style="background:#016837; padding:24px 28px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h1 style="color:white; margin:0; font-size:24px; font-weight:700;">INVOICE</h1>
              <p style="color:#80C531; margin:4px 0 0; font-size:13px;">Prime EPC & Design Consultants</p>
            </div>
            <div style="text-align:right;">
              <p style="color:white; margin:0; font-size:12px;">Date: ${new Date().toLocaleDateString('en-GB')}</p>
              <p style="color:#80C531; margin:4px 0 0; font-size:12px;">primeepcdesign.co.uk</p>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div style="padding:28px; background:#f9fafb;">

          <p style="color:#374151; margin:0 0 20px;">Dear <strong>${name}</strong>,</p>
          <p style="color:#374151; margin:0 0 20px;">
            Thank you for choosing <strong>Prime EPC and Design Consultants</strong>.
            Please find your invoice details below.
          </p>

          <!-- Invoice Details -->
          <div style="background:white; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; margin-bottom:20px;">
            <div style="background:#f3f4f6; padding:12px 16px; border-bottom:1px solid #e5e7eb;">
              <h3 style="margin:0; color:#111827; font-size:14px; text-transform:uppercase; letter-spacing:0.5px;">Service Details</h3>
            </div>
            <table style="width:100%; border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:10px 16px; color:#6b7280; width:40%;">Customer</td>
                <td style="padding:10px 16px; color:#111827; font-weight:600;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:10px 16px; color:#6b7280;">Phone</td>
                <td style="padding:10px 16px; color:#111827; font-weight:600;">${phone || 'N/A'}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:10px 16px; color:#6b7280;">Service</td>
                <td style="padding:10px 16px; color:#111827; font-weight:600;">${propertyDetails || propertyType}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:10px 16px; color:#6b7280;">Property Address</td>
                <td style="padding:10px 16px; color:#111827; font-weight:600;">${propertyAddress}, ${postcode}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:10px 16px; color:#6b7280;">Assessment Date</td>
                <td style="padding:10px 16px; color:#016837; font-weight:700;">${dateStr}</td>
              </tr>
              <tr style="background:#f0fdf4;">
                <td style="padding:12px 16px; color:#6b7280; font-weight:600;">Total Amount</td>
                <td style="padding:12px 16px; color:#016837; font-weight:800; font-size:20px;">${amountStr}</td>
              </tr>
            </table>
          </div>

          ${paymentSection}

          <!-- Contact -->
          <div style="margin-top:24px; padding:16px; background:#f0fdf4; border-radius:8px;">
            <h3 style="color:#016837; margin:0 0 8px; font-size:14px;">Need Help?</h3>
            <p style="margin:3px 0; color:#374151; font-size:13px;">📞 07308658247</p>
            <p style="margin:3px 0; color:#374151; font-size:13px;">📧 info@primeepcdesign.co.uk</p>
            <p style="margin:3px 0; color:#374151; font-size:13px;">🌐 https://www.primeepcdesign.co.uk</p>
          </div>

          <p style="color:#016837; font-weight:600; margin-top:20px; text-align:center;">
            Prime EPC and Design Consultants<br>
            <span style="color:#6b7280; font-weight:400; font-size:12px;">Company No. 17307524</span>
          </p>
        </div>
      </div>`

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