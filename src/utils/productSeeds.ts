import mongoose from 'mongoose';
import { Product } from '../modules/products/product.model';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const productSeeds = [
  {
    name: "Taxstick",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
    techStack: "MERN",
    price: "$99.00",
    sales: 80,
    reviews: 4,
    likes: 440,
    icons: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1648737963540-306235c8170e?auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Car2Go",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
    techStack: "MERN",
    price: "$99.00",
    sales: 80,
    reviews: 4,
    likes: 440,
    icons: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1648737963540-306235c8170e?auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Ecomik",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    techStack: "MERN",
    price: "$99.00",
    sales: 80,
    reviews: 4,
    likes: 440,
    icons: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1648737963540-306235c8170e?auto=format&fit=crop&q=80"
    ]
  },
  {
    name: "Gymstick",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    techStack: "MERN",
    price: "$99.00",
    sales: 80,
    reviews: 4,
    likes: 440,
    icons: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1648737963540-306235c8170e?auto=format&fit=crop&q=80"
    ]
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    logger.info('Cleared existing products');

    // Insert new products
    await Product.insertMany(productSeeds);
    logger.info('Successfully seeded products');
  } catch (error) {
    logger.error('Error seeding products:', error);
    throw error;
  }
};

const runProductSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Connected to MongoDB');

    // Run seed
    await seedProducts();
    logger.info('Product seeding completed successfully');

    // Disconnect
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    logger.error('Error running product seed:', error);
    process.exit(1);
  }
};

runProductSeed();