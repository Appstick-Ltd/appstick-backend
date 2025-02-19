import jwt from 'jsonwebtoken';
import { User } from '../users/user.model';
import { LoginCredentials, RegisterCredentials, AuthResponse } from './auth.interface';
import { IUser } from '../users/user.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const createUserResponse = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  active: user.active,
  profileImage: user.profileImage,
  bio: user.bio,
  address: user.address,
  phone: user.phone
});

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { email, password } = credentials;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('user not found');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('password is incorrect');
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    const userResponse = createUserResponse(user);
    return { token, user: { ...userResponse, _id: user._id?.toString() ?? String(userResponse._id) } };
  },

  register: async (userData: RegisterCredentials): Promise<AuthResponse> => {
    const { email } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await User.create(userData);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    const userResponse = createUserResponse(user);
    return { token, user: { ...userResponse, _id: user._id?.toString() ?? String(userResponse._id) } };
  }
};