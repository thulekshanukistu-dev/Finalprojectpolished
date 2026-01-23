const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
exports.sendEmail = async (options) => {
  try {
    // In development, log email instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email would be sent in production:');
      console.log('To:', options.email);
      console.log('Subject:', options.subject);
      console.log('Message:', options.html || options.text);
      return { success: true, preview: true };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"FreshFarm" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  const message = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
        .button { background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to FreshFarm!</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name},</h2>
          <p>Thank you for joining FreshFarm! We're excited to have you as part of our community.</p>
          
          <h3>Your Account Details:</h3>
          <ul>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Account Type:</strong> ${user.userType}</li>
            <li><strong>Joined:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          
          <p>Get started by exploring our fresh produce:</p>
          <a href="${process.env.FRONTEND_URL}/marketplace" class="button">Shop Now</a>
          
          ${user.userType === 'farmer' ? `
            <h3>Farmer Resources:</h3>
            <p>As a farmer, you can:</p>
            <ul>
              <li>List your products</li>
              <li>Set your prices</li>
              <li>Manage orders</li>
              <li>Connect with customers</li>
            </ul>
            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
          ` : ''}
          
          <p>Need help? Contact our support team at support@freshfarm.com</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} FreshFarm. All rights reserved.</p>
          <p>This email was sent to ${user.email}. If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await exports.sendEmail({
    email: user.email,
    subject: 'Welcome to FreshFarm! 🎉',
    html: message
  });
};

// Send order confirmation email
exports.sendOrderConfirmationEmail = async (order, user) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">
        <strong>${item.name}</strong><br>
        Quantity: ${item.quantity} ${item.unit}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const message = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
        .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        .total { font-size: 18px; font-weight: bold; color: #4CAF50; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 20px; background: #e8f5e9; color: #2e7d32; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Order Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name},</h2>
          <p>Thank you for your order! We've received your order and will process it soon.</p>
          
          <div class="order-details">
            <h3>Order #${order._id.toString().slice(-6).toUpperCase()}</h3>
            <p>Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: <span class="status">${order.orderStatus}</span></p>
            
            <h4>Order Items:</h4>
            <table>
              ${itemsHtml}
              <tr>
                <td style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px; text-align: right;">₹${order.itemsPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; text-align: right;"><strong>Shipping:</strong></td>
                <td style="padding: 10px; text-align: right;">₹${order.shippingPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; text-align: right;"><strong>Tax:</strong></td>
                <td style="padding: 10px; text-align: right;">₹${order.taxPrice.toFixed(2)}</td>
              </tr>
              <tr class="total">
                <td style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                <td style="padding: 10px; text-align: right;">₹${order.totalPrice.toFixed(2)}</td>
              </tr>
            </table>
            
            <h4>Shipping Address:</h4>
            <p>
              ${order.shippingAddress.name}<br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}<br>
              Phone: ${order.shippingAddress.phone}
            </p>
            
            <h4>Payment Method:</h4>
            <p>${order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
            <p>Payment Status: ${order.paymentStatus}</p>
          </div>
          
          <p>You can track your order in your dashboard:</p>
          <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Order
          </a>
          
          <p>Need help? Contact our support team at support@freshfarm.com</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} FreshFarm. All rights reserved.</p>
          <p>Order ID: ${order._id}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await exports.sendEmail({
    email: user.email,
    subject: `FreshFarm Order Confirmation #${order._id.toString().slice(-6).toUpperCase()}`,
    html: message
  });
};

// Send password reset email
exports.sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const message = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
        .button { background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; color: #856404; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Password Reset</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name},</h2>
          <p>We received a request to reset your password for your FreshFarm account.</p>
          
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          
          <div class="warning">
            <p><strong>⚠️ Important:</strong> This link will expire in 10 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
          
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666; background: #f5f5f5; padding: 10px; border-radius: 5px;">
            ${resetUrl}
          </p>
          
          <p>Need help? Contact our support team at support@freshfarm.com</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} FreshFarm. All rights reserved.</p>
          <p>This email was sent to ${user.email}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await exports.sendEmail({
    email: user.email,
    subject: 'FreshFarm Password Reset Request',
    html: message
  });
};