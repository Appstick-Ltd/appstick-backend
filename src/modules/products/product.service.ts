import { Product } from './product.model';
import { IProduct } from './product.interface';

export const ProductService = {
  createProduct: async (productData: Partial<IProduct>, file?: Express.Multer.File): Promise<IProduct> => {
    if (file) {
      productData.image = file.path;
    }
    return await Product.create(productData);
  },

  getAllProducts: async (skip: number = 0, limit: number = 10, searchQuery: any = {}): Promise<IProduct[]> => {
    return await Product.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  },

  countProducts: async (searchQuery: any = {}): Promise<number> => {
    return await Product.countDocuments(searchQuery);
  },

  getProductById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
  },

  updateProduct: async (id: string, productData: Partial<IProduct>, file?: Express.Multer.File): Promise<IProduct | null> => {
    if (file) {
      productData.image = file.path;
    }
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  },

  deleteProduct: async (id: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(id);
  },
};