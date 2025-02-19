export interface IService {
  id?: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}