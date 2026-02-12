const Order = require('../models/order.model');
const Product = require('../models/product.model');
const sendEmail = require('../utils/sendEmail');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { customerEmail, customerName, shippingAddress, items } = req.body;
    
    // Validate stock availability
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.name} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}` 
        });
      }
    }
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const order = new Order({
      orderNumber: generateOrderNumber(),
      customerEmail,
      customerName,
      shippingAddress,
      items,
      totalAmount
    });
    
    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status after payment
// Update order status after payment
exports.updateOrderStatus = async (req, res) => {
  try {
    const { razorpayPaymentId, paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        paymentIntentId: razorpayPaymentId, // Store Razorpay payment ID
        paymentStatus 
      },
      { new: true }
    ).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // If payment successful, update stock and send confirmation email
    if (paymentStatus === 'paid') {
      // Update product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }
      
      // Send confirmation email
      await sendEmail(
        order.customerEmail,
        'Order Confirmation',
        `Thank you for your order! Your order number is ${order.orderNumber}.`
      );
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};