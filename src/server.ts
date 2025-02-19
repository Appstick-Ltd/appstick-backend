import app from './app';
import connectDB from './config/db';
import { logger } from './utils/logger';

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 