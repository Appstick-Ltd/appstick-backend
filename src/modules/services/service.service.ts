import { Service } from './service.model';
import { IService } from './service.interface';
import { ServiceSearchQuery } from './service.types';
import { uploadFile, deleteFile } from '../../utils/uploader';

export const ServiceService = {
  createService: async (serviceData: Partial<IService>, file?: Express.Multer.File): Promise<IService> => {
    if (file) {
      const imageUrl = await uploadFile(file, 'services');
      serviceData.imageUrl = imageUrl;
    }
    return await Service.create(serviceData);
  },

  getAllServices: async (skip: number = 0, limit: number = 10, searchQuery: ServiceSearchQuery = {}): Promise<IService[]> => {
    const query: Record<string, any> = {};
    if (searchQuery.title) query.title = { $regex: searchQuery.title, $options: 'i' };
    if (searchQuery.category) query.category = searchQuery.category;
    if (searchQuery.status) query.status = searchQuery.status;
    if (searchQuery.price) query.price = searchQuery.price;
    if (searchQuery.rating) query.rating = searchQuery.rating;
    if (searchQuery.reviewCount) query.reviewCount = searchQuery.reviewCount;

    return await Service.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  },

  countServices: async (searchQuery: ServiceSearchQuery = {}): Promise<number> => {
    const query: Record<string, any> = {};
    if (searchQuery.title) query.title = { $regex: searchQuery.title, $options: 'i' };
    if (searchQuery.category) query.category = searchQuery.category;
    if (searchQuery.status) query.status = searchQuery.status;
    if (searchQuery.price) query.price = searchQuery.price;
    if (searchQuery.rating) query.rating = searchQuery.rating;
    if (searchQuery.reviewCount) query.reviewCount = searchQuery.reviewCount;

    return await Service.countDocuments(query);
  },

  getServiceById: async (id: string): Promise<IService | null> => {
    return await Service.findById(id);
  },

  updateService: async (id: string, serviceData: Partial<IService>, file?: Express.Multer.File): Promise<IService | null> => {
    const service = await Service.findById(id);
    if (!service) return null;

    if (file) {
      if (service.imageUrl) {
        const oldImageKey = service.imageUrl.split('/').pop();
        if (oldImageKey) await deleteFile(oldImageKey);
      }
      const imageUrl = await uploadFile(file, 'services');
      serviceData.imageUrl = imageUrl;
    }

    return await Service.findByIdAndUpdate(id, serviceData, { new: true });
  },

  deleteService: async (id: string): Promise<IService | null> => {
    const service = await Service.findById(id);
    if (!service) return null;

    if (service.imageUrl) {
      const imageKey = service.imageUrl.split('/').pop();
      if (imageKey) await deleteFile(imageKey);
    }

    return await Service.findByIdAndDelete(id);
  },
};