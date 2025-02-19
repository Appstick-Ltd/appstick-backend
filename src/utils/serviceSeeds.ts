import mongoose from 'mongoose';
import { Service } from '../modules/services/service.model';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const serviceSeeds = [
  {
    title: "App development for on android and IOS",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
  },
  {
    title: "Web development for and UI/UX Design",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80"
  },
  {
    title: "App development for on android and IOS",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80"
  },
  {
    title: "Website development for and branding",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80"
  },
  {
    title: "Website development for and branding",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    title: "Website development for and branding",
    price: 180.0,
    rating: 4.0,
    reviews: 2,
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80"
  }
];

const seedServices = async () => {
  try {
    // Clear existing services
    await Service.deleteMany({});
    logger.info('Cleared existing services');

    // Insert new services
    await Service.insertMany(serviceSeeds);
    logger.info('Successfully seeded services');
  } catch (error) {
    logger.error('Error seeding services:', error);
    throw error;
  }
};

const runServiceSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Connected to MongoDB');

    // Run seed
    await seedServices();
    logger.info('Service seeding completed successfully');

    // Disconnect
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    logger.error('Error running service seed:', error);
    process.exit(1);
  }
};

runServiceSeed();