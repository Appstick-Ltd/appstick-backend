import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import authRoutes from '../modules/auth/auth.route';
import uploadRoutes from '../modules/upload/upload.route';
import serviceRoutes from '../modules/services/service.route';
import productRoutes from '../modules/products/product.route';

interface RouteConfig {
  path: string;
  router: Router;
  description?: string;
}

const API_PREFIX = process.env.API_PREFIX || '/api';

const routes: RouteConfig[] = [
  {
    path: `${API_PREFIX}/auth`,
    router: authRoutes,
    description: 'Authentication routes for login and registration'
  },
  {
    path: `${API_PREFIX}/users`,
    router: userRoutes,
    description: 'User management routes'
  },
  {
    path: `${API_PREFIX}/upload`,
    router: uploadRoutes,
    description: 'File upload routes'
  },
  {
    path: `${API_PREFIX}/services`,
    router: serviceRoutes,
    description: 'Service management routes'
  },
  {
    path: `${API_PREFIX}/products`,
    router: productRoutes,
    description: 'Product management routes'
  }
];

export const registerRoutes = (app: Router): void => {
  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};

export default routes;