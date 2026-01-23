const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: String,
    country: {
      type: String,
      default: 'Sri Lanka'
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash_on_delivery', 'card', 'online_banking']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: Date,
  notes: String,
  trackingNumber: String,
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'next_day'],
    default: 'standard'
  },
  discount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate total price before saving
orderSchema.pre('save', function(next) {
  this.itemsPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Shipping price logic
  if (this.itemsPrice > 500) {
    this.shippingPrice = 0; // Free shipping above 500
  } else {
    this.shippingPrice = 50;
  }
  
  // Tax calculation (5%)
  this.taxPrice = this.itemsPrice * 0.05;
  
  // Apply discount
  const discountedAmount = this.itemsPrice * (this.discount / 100);
  
  this.totalPrice = this.itemsPrice + this.shippingPrice + this.taxPrice - discountedAmount;
  
  this.updatedAt = Date.now();
  next();
});

// Update product stock when order is created
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    for (const item of this.items) {
      const product = await mongoose.model('Product').findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        if (product.stock < 0) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        await product.save();
      }
    }
  }
  next();
});

// Indexes for better query performance
orderSchema.index({ user: 1 });
orderSchema.index({ farmer: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Order', orderSchema);