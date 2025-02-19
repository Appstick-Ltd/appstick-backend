import { Types } from 'mongoose';

export type UserRole = 'admin' | 'manager' | 'employee' | 'customer';
export type Department = 'design' | 'development' | 'marketing' | 'sales';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: Department;  // Optional since customers don't need it
  active: boolean;
  profileImage?: string;
  bio?: string;
  // Customer specific fields
  address?: string;
  phone?: string;
  // For both agency members and customers
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}