import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import authRoutes from '../modules/auth/auth.route';

interface RouteConfig {
  path: string;
  router: Router;
  description?: string;
}

const routes: RouteConfig[] = [
  {
    path: '/api/auth',
    router: authRoutes,
    description: 'Authentication routes for login and registration'
  },
  {
    path: '/api/users',
    router: userRoutes,
    description: 'User management routes'
  }
];

export const registerRoutes = (app: Router): void => {
  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });
};

export default routes;