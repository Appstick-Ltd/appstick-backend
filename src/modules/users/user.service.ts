import { User } from './user.model';
import { IUser } from './user.interface';

export const UserService = {
  createUser: async (userData: Partial<IUser>): Promise<IUser> => {
    return await User.create(userData);
  },

  getAllUsers: async (skip: number = 0, limit: number = 10): Promise<IUser[]> => {
    return await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  },

  countUsers: async (): Promise<number> => {
    return await User.countDocuments();
  },

  getUserById: async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select('-password');
  },

  updateUser: async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
  },

  deleteUser: async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
  },
}; 