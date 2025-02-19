export interface ServiceSearchQuery {
  title?: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  category?: string;
  status?: string;
}

import { IService } from './service.interface';