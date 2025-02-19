import mongoose from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      required: [true, 'Please add number of reviews'],
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', serviceSchema);