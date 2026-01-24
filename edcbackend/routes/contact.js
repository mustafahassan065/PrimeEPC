const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Use the same transporter as booking emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_app_password_here'
  }
});

// Send contact form email
router.post('/send-contact-form', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      service, 
      message 
    } = req.body;

    // Service type mapping
    const serviceTypes = {
      'domestic-epc': 'Domestic EPC',
      'commercial-epc': 'Commercial EPC', 
      'design-consultancy': 'Design Consultancy',
      'other': 'Other Inquiry'
    };

    const serviceName = serviceTypes[service] || service;

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
      to: 'primeepc.design@gmail.com',
      subject: '📧 New Contact Form Submission - Prime EPC & Design Consultants',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
                .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #059669; }
                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
                .urgent { background: #fef3cd; border-left: 4px solid #f59e0b; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 New Contact Inquiry</h1>
                    <p>Prime EPC & Design Consultants</p>
                </div>
                <div class="content">
                    <div class="details urgent">
                        <h3>🚀 Immediate Action Required</h3>
                        <p>A potential client has submitted a contact form. Please respond within 24 hours.</p>
                    </div>
                    
                    <div class="details">
                        <h3>👤 Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    </div>

                    <div class="details">
                        <h3>🛠️ Service Requested</h3>
                        <p><strong>Service Type:</strong> ${serviceName}</p>
                    </div>

                    <div class="details">
                        <h3>💬 Message</h3>
                        <p>${message}</p>
                    </div>

                    <div class="details">
                        <h3>⏰ Submission Time</h3>
                        <p>${new Date().toLocaleString('en-GB', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    </div>

                    <div class="details" style="background: #e0f2fe; border-left: 4px solid #0369a1;">
                        <h3>📞 Quick Actions</h3>
                        <p><strong>Email Reply:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${phone ? `<p><strong>Call Back:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                    </div>
                </div>
                <div class="footer">
                    <p>This email was automatically generated from your website contact form.</p>
                    <p>Prime EPC & Design Consultants &copy; ${new Date().getFullYear()}</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    // Auto-reply to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
      to: email,
      subject: '✅ Thank You for Contacting Prime EPC & Design Consultants',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
                .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #059669; }
                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
                .next-steps { background: #f0fdf4; border-left: 4px solid #10b981; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✅ Message Received</h1>
                    <p>Prime EPC & Design Consultants</p>
                </div>
                <div class="content">
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>Thank you for contacting Prime EPC & Design Consultants. We have received your inquiry and our team will get back to you within 24 hours.</p>
                    
                    <div class="details">
                        <h3>📋 Your Inquiry Summary</h3>
                        <p><strong>Service:</strong> ${serviceName}</p>
                        <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
                    </div>

                    <div class="details next-steps">
                        <h3>📅 What Happens Next?</h3>
                        <ul>
                            <li>Our team will review your requirements</li>
                            <li>We'll contact you to discuss your needs</li>
                            <li>Provide a competitive quote if applicable</li>
                            <li>Schedule your service at your convenience</li>
                        </ul>
                    </div>

                    <div class="details">
                        <h3>📞 Need Immediate Assistance?</h3>
                        <p>If you need to speak with us urgently, please don't hesitate to contact us directly:</p>
                        <p><strong>Phone:</strong> +44 7469 340373</p>
                        <p><strong>Email:</strong> primeepc.design@gmail.com</p>
                    </div>
                </div>
                <div class="footer">
                    <p>Prime EPC & Design Consultants &copy; ${new Date().getFullYear()}</p>
                    <p>Thank you for considering us for your energy performance and design needs.</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    console.log('✅ Contact form emails sent successfully');
    console.log('📧 Admin notification sent to: primeepc.design@gmail.com');
    console.log('📧 Auto-reply sent to:', email);

    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('❌ Contact form email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form: ' + error.message
    });
  }
});

module.exports = router;