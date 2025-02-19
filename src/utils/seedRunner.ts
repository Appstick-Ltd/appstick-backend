import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedUsers } from './seed';
import { logger } from './logger';

dotenv.config();

const runSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Connected to MongoDB');

    // Run seed
    await seedUsers();
    logger.info('Seeding completed successfully');

    // Disconnect
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    logger.error('Error running seed:', error);
    process.exit(1);
  }
};

runSeed(); 