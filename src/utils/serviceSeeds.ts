import mongoose from 'mongoose';
import { Service } from '../modules/services/service.model';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const serviceSeeds = [
  {
    title: "Mobile App Development for iOS and Android",
    price: 199.0,
    rating: 4.8,
    reviews: 15,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
  },
  {
    title: "Full Stack Web Development",
    price: 249.0,
    rating: 4.9,
    reviews: 23,
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80"
  },
  {
    title: "UI/UX Design and Prototyping",
    price: 159.0,
    rating: 4.7,
    reviews: 18,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80"
  },
  {
    title: "E-commerce Website Development",
    price: 299.0,
    rating: 4.8,
    reviews: 25,
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80"
  },
  {
    title: "Digital Marketing and SEO",
    price: 149.0,
    rating: 4.6,
    reviews: 12,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    title: "Cloud Infrastructure Setup",
    price: 279.0,
    rating: 4.9,
    reviews: 14,
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80"
  },
  {
    title: "Custom Software Development",
    price: 329.0,
    rating: 4.8,
    reviews: 20,
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80"
  },
  {
    title: "WordPress Development and Customization",
    price: 139.0,
    rating: 4.5,
    reviews: 28,
    imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&q=80"
  },
  {
    title: "API Development and Integration",
    price: 189.0,
    rating: 4.7,
    reviews: 16,
    imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80"
  },
  {
    title: "Database Design and Optimization",
    price: 219.0,
    rating: 4.8,
    reviews: 19,
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80"
  },
  {
    title: "Mobile Game Development",
    price: 289.0,
    rating: 4.6,
    reviews: 21,
    imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80"
  },
  {
    title: "Cybersecurity Consulting",
    price: 299.0,
    rating: 4.9,
    reviews: 17,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
  },
  {
    title: "AI and Machine Learning Solutions",
    price: 349.0,
    rating: 4.8,
    reviews: 13,
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80"
  },
  {
    title: "DevOps Implementation",
    price: 259.0,
    rating: 4.7,
    reviews: 15,
    imageUrl: "https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&q=80"
  },
  {
    title: "Blockchain Development",
    price: 379.0,
    rating: 4.8,
    reviews: 11,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
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