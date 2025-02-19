import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image: string;
  techStack: string;
  price: string;
  sales: number;
  reviews: number;
  likes: number;
  icons: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductResponse {
  id: string;
  name: string;
  image: string;
  techStack: string;
  price: string;
  sales: number;
  reviews: number;
  likes: number;
  icons: string[];
  createdAt: Date;
  updatedAt: Date;
}