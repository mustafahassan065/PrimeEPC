// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Configure nodemailer - FIXED: createTransport instead of createTransporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
//     pass: process.env.EMAIL_PASS || 'your_app_password_here'
//   }
// });

// // Send booking confirmation email
// router.post('/send-booking-confirmation', async (req, res) => {
//   try {
//     const { 
//       name, 
//       email, 
//       phone, 
//       propertyType, 
//       propertyAddress, 
//       preferredDate, 
//       message 
//     } = req.body;

//     // Format the date for display
//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     };

//     const formatTime = (timeString) => {
//       const [hours, minutes] = timeString.split(':');
//       const hour = parseInt(hours);
//       const ampm = hour >= 12 ? 'PM' : 'AM';
//       const formattedHour = hour % 12 || 12;
//       return `${formattedHour}:${minutes} ${ampm}`;
//     };

//     // Extract date and time from preferredDate
//     const [datePart, timePart] = preferredDate.split('T');
//     const formattedDate = formatDate(datePart);
//     const formattedTime = formatTime(timePart);

//     // Email to admin
//     const adminMailOptions = {
//       from: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
//       to: 'primeepc.design@gmail.com',
//       subject: '📅 New EPC Assessment Booking - Prime EPC & Design Consultants',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//                 .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                 .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
//                 .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #059669; }
//                 .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>📅 New Booking Received</h1>
//                     <p>Prime EPC & Design Consultants</p>
//                 </div>
//                 <div class="content">
//                     <h2>Booking Details</h2>
                    
//                     <div class="details">
//                         <h3>👤 Customer Information</h3>
//                         <p><strong>Name:</strong> ${name}</p>
//                         <p><strong>Email:</strong> ${email}</p>
//                         <p><strong>Phone:</strong> ${phone}</p>
//                     </div>

//                     <div class="details">
//                         <h3>🏠 Property Details</h3>
//                         <p><strong>Property Type:</strong> ${propertyType === 'domestic' ? 'Domestic Property' : 'Commercial Property'}</p>
//                         <p><strong>Address:</strong> ${propertyAddress}</p>
//                     </div>

//                     <div class="details">
//                         <h3>📅 Appointment Details</h3>
//                         <p><strong>Date:</strong> ${formattedDate}</p>
//                         <p><strong>Time:</strong> ${formattedTime}</p>
//                     </div>

//                     ${message ? `
//                     <div class="details">
//                         <h3>💬 Additional Message</h3>
//                         <p>${message}</p>
//                     </div>
//                     ` : ''}

//                     <div class="details">
//                         <h3>⏰ Booking Time</h3>
//                         <p>${new Date().toLocaleString('en-GB', { 
//                             weekday: 'long',
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                         })}</p>
//                     </div>
//                 </div>
//                 <div class="footer">
//                     <p>This email was automatically generated from your booking system.</p>
//                     <p>Prime EPC & Design Consultants &copy; ${new Date().getFullYear()}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `
//     };

//     // Email to customer
//     const customerMailOptions = {
//       from: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
//       to: email,
//       subject: '✅ Your EPC Assessment Booking Confirmation - Prime EPC & Design Consultants',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//                 .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                 .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
//                 .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #059669; }
//                 .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
//                 .important { background: #fef3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>✅ Booking Confirmed</h1>
//                     <p>Prime EPC & Design Consultants</p>
//                 </div>
//                 <div class="content">
//                     <p>Dear <strong>${name}</strong>,</p>
//                     <p>Thank you for booking your EPC assessment with us. Your appointment has been confirmed.</p>
                    
//                     <div class="details">
//                         <h3>📅 Your Appointment</h3>
//                         <p><strong>Date:</strong> ${formattedDate}</p>
//                         <p><strong>Time:</strong> ${formattedTime}</p>
//                     </div>

//                     <div class="important">
//                         <h3>📍 What to Expect</h3>
//                         <p>Our assessor will visit your property at the scheduled time. The assessment usually takes 30-60 minutes.</p>
//                         <p><strong>Please ensure:</strong></p>
//                         <ul>
//                             <li>Someone is available at the property</li>
//                             <li>All rooms are accessible</li>
//                             <li>Heating systems are operational</li>
//                         </ul>
//                     </div>

//                     <div class="details">
//                         <h3>📞 Contact Information</h3>
//                         <p>If you need to reschedule or have any questions, please contact us:</p>
//                         <p>📞 +44 7469 340373</p>
//                         <p>📧 Primeepc.design@gmail.com</p>
//                     </div>
//                 </div>
//                 <div class="footer">
//                     <p>Prime EPC & Design Consultants &copy; ${new Date().getFullYear()}</p>
//                     <p>Thank you for choosing us for your energy performance certificate needs.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `
//     };

//     // Send both emails
//     await transporter.sendMail(adminMailOptions);
//     await transporter.sendMail(customerMailOptions);

//     console.log('✅ Emails sent successfully');
//     console.log('📧 Admin email sent to: primeepc.design@gmail.com');
//     console.log('📧 Customer email sent to:', email);

//     res.json({
//       success: true,
//       message: 'Booking confirmation emails sent successfully'
//     });

//   } catch (error) {
//     console.error('❌ Email sending error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send confirmation emails: ' + error.message
//     });
//   }
// });

// // Test email route
// router.post('/test-email', async (req, res) => {
//   try {
//     const testMailOptions = {
//       from: process.env.EMAIL_USER || 'primeepc.design@gmail.com',
//       to: 'primeepc.design@gmail.com',
//       subject: '✅ Test Email - Prime EPC Booking System',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//                 .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>✅ Test Successful</h1>
//                     <p>Prime EPC & Design Consultants</p>
//                 </div>
//                 <div style="padding: 20px; text-align: center;">
//                     <p>Your email system is working correctly!</p>
//                     <p>Timestamp: ${new Date().toLocaleString('en-GB')}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `
//     };

//     await transporter.sendMail(testMailOptions);
    
//     res.json({
//       success: true,
//       message: 'Test email sent successfully'
//     });
//   } catch (error) {
//     console.error('Test email error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Test email failed: ' + error.message
//     });
//   }
// });

// module.exports = router;