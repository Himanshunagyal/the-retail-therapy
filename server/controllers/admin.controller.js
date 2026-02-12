const Admin = require('../models/admin.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const { generateToken } = require('../middleware/auth.middleware');

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔍 Login attempt for:', email);

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('❌ Admin not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Admin found:', admin.email);

    // Check if admin is active
    if (!admin.isActive) {
      console.log('❌ Admin inactive');
      return res.status(401).json({ error: 'Account is inactive' });
    }

    console.log('🔐 Checking password...');

    // Verify password
    const isMatch = await admin.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Login successful');

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create admin (for initial setup)
exports.createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = new Admin({ email, password, name });
    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total products
    const totalProducts = await Product.countDocuments();
    
    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('items.productId');
    
    // Calculate total revenue
    const orders = await Order.find({ paymentStatus: 'paid' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Get orders by status
    const pendingOrders = await Order.countDocuments({ orderStatus: 'processing' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });

    res.json({
      totalProducts,
      lowStockProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify token (check if logged in)
exports.verifyToken = async (req, res) => {
  res.json({
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name,
      role: req.admin.role
    }
  });
};