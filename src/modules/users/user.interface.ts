import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
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