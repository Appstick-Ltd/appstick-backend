import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee', 'customer'],
      default: 'customer'
    },
    department: {
      type: String,
      enum: ['design', 'development', 'marketing', 'sales'],
      required: function(this: { role: string }) {
        return ['admin', 'manager', 'employee'].includes(this.role);
      }
    },
    active: {
      type: Boolean,
      default: true
    },
    profileImage: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: 500,
      default: null
    },
    // Customer specific fields
    address: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 