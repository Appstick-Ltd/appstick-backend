import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  department: 'design' | 'development' | 'marketing' | 'sales';
  active: boolean;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
} 