import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    techStack: {
      type: String,
      required: [true, 'Tech stack is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    sales: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    icons: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);