import { User } from '../modules/users/user.model';
import { logger } from './logger';
import bcrypt from 'bcryptjs';

const generateTestUsers = async (count: number) => {
  const roles = ['admin', 'manager', 'employee'];
  const departments = ['design', 'development', 'marketing', 'sales'];
  const domains = ['agency.com', 'creative.co', 'digital.io'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Maria'];

  // Hash passwords for base users
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const managerPassword = await bcrypt.hash('manager123', salt);
  const defaultPassword = await bcrypt.hash('password123', salt);

  // Ensure we have at least one admin and one manager
  const baseUsers = [
    {
      name: 'Admin User',
      email: 'admin@agency.com',
      password: adminPassword,
      role: 'admin',
      department: 'development',
      active: true,
      bio: 'Agency Administrator'
    },
    {
      name: 'Manager User',
      email: 'manager@agency.com',
      password: managerPassword,
      role: 'manager',
      department: 'marketing',
      active: true,
      bio: 'Department Manager'
    }
  ];

  const remainingCount = count - baseUsers.length;
  const randomUsers = Array.from({ length: remainingCount }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const role = Math.random() > 0.8 ? 'manager' : 'employee'; // 20% chance of being a manager

    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      password: defaultPassword,
      role,
      department,
      active: true,
      bio: `${role.charAt(0).toUpperCase() + role.slice(1)} in ${department} department`
    };
  });

  return [...baseUsers, ...randomUsers];
};

export const seedUsers = async (): Promise<void> => {
  try {
    // Clear existing users
    await User.deleteMany({});
    logger.info('Cleared existing users');

    // Generate and insert test users
    const testUsers = await generateTestUsers(20);
    const users = await User.insertMany(testUsers);
    logger.info(`Seeded ${users.length} test users`);

    // Log sample users for testing
    const adminUser = users.find(user => user.role === 'admin');
    const managerUser = users.find(user => user.role === 'manager');
    
    logger.info('Admin user created:', {
      email: adminUser?.email,
      password: 'admin123'
    });
    
    logger.info('Manager user created:', {
      email: managerUser?.email,
      password: 'manager123'
    });
  } catch (error) {
    logger.error('Error seeding users:', error);
    throw error;
  }
};