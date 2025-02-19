import { UserRole, Department } from '../users/user.interface';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  department?: Department;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    department?: Department;
    active: boolean;
    profileImage?: string;
    bio?: string;
    address?: string;
    phone?: string;
  };
}