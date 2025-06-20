const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Generate PDF receipt and send it via email
 * @param {Object} user
 * @param {String} orderId
 * @param {String} paymentId
 * @param {Number} amount (in paisa)
 */
async function sendPaymentConfirmationMail(user, orderId, paymentId, amount) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 40px 20px;
        }
        
        .receipt-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          position: relative;
        }
        
        .header {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="30" cy="70" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 40px;
          position: relative;
          z-index: 1;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        
        .header p {
          font-size: 16px;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .greeting {
          font-size: 18px;
          color: #333;
          margin-bottom: 25px;
          text-align: center;
        }
        
        .greeting strong {
          color: #4CAF50;
          font-weight: 600;
        }
        
        .details-section {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 30px;
          margin: 30px 0;
          border: 1px solid #e9ecef;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #4CAF50, #45a049);
          border-radius: 2px;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 25px;
        }
        
        .detail-item {
          background: white;
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .detail-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .detail-value {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          word-break: break-all;
        }
        
        .amount-highlight {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          text-align: center;
          border-left: none;
          font-size: 24px;
          font-weight: 700;
        }
        
        .amount-highlight .detail-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }
        
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .footer-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .footer h3 {
          color: #4CAF50;
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .footer p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        
        .contact-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        
        .contact-info p {
          font-size: 12px;
          color: #888;
        }
        
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          color: rgba(76, 175, 80, 0.05);
          font-weight: bold;
          z-index: 0;
          pointer-events: none;
        }
        
        @media (max-width: 600px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .header {
            padding: 30px 20px;
          }
          
          .content {
            padding: 30px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="watermark">PAID</div>
        
        <div class="header">
          <div class="success-icon">✓</div>
          <h1>Payment Successful</h1>
          <p>Your transaction has been completed successfully</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hello <strong>${user.userName}</strong>,<br>
            Thank you for your payment!
          </div>
          
          <div class="details-section">
            <div class="section-title">Transaction Details</div>
            <div class="details-grid">
              <div class="detail-item">
                <div class="detail-label">Order ID</div>
                <div class="detail-value">${orderId}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Payment ID</div>
                <div class="detail-value">${paymentId}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Registration No</div>
                <div class="detail-value">${user.regNo}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${user.email}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Transaction Date</div>
                <div class="detail-value">${new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
              
              <div class="detail-item amount-highlight">
                <div class="detail-label">Amount Paid</div>
                <div class="detail-value">₹${(amount / 100).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-content">
            <h3>VIT Events Team</h3>
            <p>This is an automated receipt for your payment. Please keep this for your records.</p>
            <p>If you have any questions regarding this transaction, please contact our support team.</p>
            
            <div class="contact-info">
              <p>Generated on: ${new Date().toLocaleString('en-IN')}</p>
              <p>Receipt ID: ${Date.now()}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const pdfPath = path.join(__dirname, `receipt_${Date.now()}.pdf`);
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Generate PDF with better settings
    await page.pdf({ 
      path: pdfPath, 
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();

    // Send email with the beautiful PDF
    await transporter.sendMail({
      from: {
        name: 'VIT Events Team',
        address: process.env.EMAIL_USER
      },
      to: user.email,
      subject: "✅ Payment Receipt - VIT Event Registration",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4CAF50;">Payment Confirmation</h2>
          <p>Dear ${user.userName},</p>
          <p>Thank you for your payment! Your transaction has been processed successfully.</p>
          <p>Please find your detailed payment receipt attached as a PDF.</p>
          <div style="background: #f0f8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Quick Summary:</strong><br>
            Amount: ₹${(amount / 100).toFixed(2)}<br>
            Order ID: ${orderId}<br>
            Date: ${new Date().toLocaleDateString('en-IN')}
          </div>
          <p style="color: #666; font-size: 14px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
          <p style="color: #4CAF50; font-weight: bold;">— VIT Events Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `VIT_Event_Receipt_${orderId}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf'
        },
      ],
    });

    console.log(`✅ Receipt sent successfully to ${user.email}`);
    
    // Clean up temp file
    fs.unlink(pdfPath, (err) => {
      if (err) console.log('Error deleting temp file:', err);
    });
    
  } catch (error) {
    console.error('Error generating or sending receipt:', error);
    throw error;
  }
}

module.exports = { sendPaymentConfirmationMail };