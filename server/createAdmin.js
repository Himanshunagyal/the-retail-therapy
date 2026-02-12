require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin.model');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin details
    const adminData = {
      email: 'admin@store.com',
      password: 'admin123', // This will be hashed automatically
      name: 'Admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('❌ Admin already exists with email:', adminData.email);
      console.log('   Deleting existing admin...');
      await Admin.deleteOne({ email: adminData.email });
      console.log('   Deleted. Creating new admin...');
    }

    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();

    console.log('\n✅ Admin created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('   Email:', adminData.email);
    console.log('   Password:', adminData.password);
    console.log('\n🔗 Login at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();