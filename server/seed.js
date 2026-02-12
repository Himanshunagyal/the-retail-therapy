require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product.model');

const sampleProducts = [
  {
    name: "Classic White Cotton Tee",
    description: "100% premium cotton t-shirt in pure white. Timeless essential with a perfect fit. Breathable fabric ideal for everyday wear.",
    price: 899,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 50,
    featured: true
  },
  {
    name: "Black Minimalist Tee",
    description: "Jet black t-shirt with a slim fit cut. Made from soft organic cotton. Perfect base layer for any outfit.",
    price: 899,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 45,
    featured: true
  },
  {
    name: "Striped Navy Tee",
    description: "Classic navy and white striped t-shirt. Nautical-inspired design with a modern fit. Soft cotton blend.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 35,
    featured: true
  },
  {
    name: "Vintage Graphic Tee",
    description: "Retro-inspired graphic print on premium cotton. Soft-washed for a lived-in feel. Unique vintage design.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 30,
    featured: true
  },
  {
    name: "Heather Grey V-Neck",
    description: "Comfortable v-neck t-shirt in heather grey. Flattering cut with a modern silhouette. Wrinkle-resistant fabric.",
    price: 999,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 40,
    featured: false
  },
  {
    name: "Olive Green Pocket Tee",
    description: "Earth-tone olive green with chest pocket detail. Relaxed fit in heavyweight cotton. Durable construction.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 28,
    featured: true
  },
  {
    name: "Burgundy Crew Neck",
    description: "Rich burgundy crew neck t-shirt. Soft pre-shrunk cotton for lasting fit. Perfect autumn color.",
    price: 949,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 32,
    featured: false
  },
  {
    name: "Charcoal Longline Tee",
    description: "Extended length t-shirt in charcoal grey. Modern streetwear silhouette. Premium cotton blend.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 25,
    featured: false
  },
  {
    name: "Mustard Yellow Tee",
    description: "Bold mustard yellow statement piece. Soft cotton with a relaxed fit. Adds color to any wardrobe.",
    price: 899,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 38,
    featured: true
  },
  {
    name: "Navy Blue Henley",
    description: "Classic henley style with button placket. Deep navy blue in soft cotton. Versatile layering piece.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 22,
    featured: false
  },
  {
    name: "Sage Green Oversized Tee",
    description: "Trendy oversized fit in calming sage green. Dropped shoulders and relaxed silhouette. 100% cotton.",
    price: 1249,
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 33,
    featured: true
  },
  {
    name: "Ash Grey Melange Tee",
    description: "Textured melange grey fabric. Athletic-inspired cut with reinforced seams. Moisture-wicking properties.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 42,
    featured: false
  },
  {
    name: "Rust Orange Pocket Tee",
    description: "Warm rust orange with contrast pocket. Vintage-washed finish. Comfortable regular fit.",
    price: 1149,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 27,
    featured: true
  },
  {
    name: "Forest Green Crew",
    description: "Deep forest green essential tee. Sustainable organic cotton. Classic crew neck design.",
    price: 999,
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 36,
    featured: false
  },
  {
    name: "Cream Beige Tee",
    description: "Soft cream beige neutral tone. Versatile wardrobe staple. Premium cotton with subtle sheen.",
    price: 949,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 44,
    featured: true
  },
  {
    name: "Tie-Dye Multi Tee",
    description: "Hand-dyed tie-dye pattern in vibrant colors. Each piece is unique. Relaxed bohemian fit.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    category: "T-Shirts",
    stock: 18,
    featured: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${products.length} t-shirts to database`);

    console.log('\n👕 T-Shirt Collection:');
    products.forEach(product => {
      console.log(`  - ${product.name} (₹${product.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();