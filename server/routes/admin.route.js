const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middleware/auth.middleware');

// Public routes
router.post('/login', adminController.login);
router.post('/create', adminController.createAdmin); // Remove this in production

// Protected routes
router.get('/verify', verifyAdmin, adminController.verifyToken);
router.get('/dashboard-stats', verifyAdmin, adminController.getDashboardStats);

module.exports = router;