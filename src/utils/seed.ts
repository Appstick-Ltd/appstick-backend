import { User } from '../modules/users/user.model';
import { logger } from './logger';
import bcrypt from 'bcryptjs';
import { UserRole, Department } from '../modules/users/user.interface';

const generateTestUsers = async () => {
  const departments: Department[] = ['design', 'development', 'marketing', 'sales'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Maria'];

  // Hash passwords for users
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash('password123', salt);

  // Create base agency users
  const agencyUsers = [
    {
      name: 'Admin User',
      email: 'admin@agency.com',
      password: defaultPassword,
      role: 'admin' as UserRole,
      department: 'development' as Department,
      active: true,
      bio: 'Main Administrator'
    },
    {
      name: 'Marketing Manager',
      email: 'manager.marketing@agency.com',
      password: defaultPassword,
      role: 'manager' as UserRole,
      department: 'marketing' as Department,
      active: true,
      bio: 'Marketing Department Manager'
    },
    {
      name: 'Development Manager',
      email: 'manager.dev@agency.com',
      password: defaultPassword,
      role: 'manager' as UserRole,
      department: 'development' as Department,
      active: true,
      bio: 'Development Department Manager'
    },
    {
      name: 'Sales Employee',
      email: 'sales@agency.com',
      password: defaultPassword,
      role: 'employee' as UserRole,
      department: 'sales' as Department,
      active: true,
      bio: 'Sales Representative'
    },
    {
      name: 'Design Employee',
      email: 'designer@agency.com',
      password: defaultPassword,
      role: 'employee' as UserRole,
      department: 'design' as Department,
      active: true,
      bio: 'UI/UX Designer'
    }
  ];

  // Create customer users with guaranteed unique emails
  const customers = Array.from({ length: 5 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const city = cities[index % cities.length];

    return {
      name: `${firstName} ${lastName}`,
      email: `customer${index + 1}.${firstName.toLowerCase()}.${lastName.toLowerCase()}@customer.com`,
      password: defaultPassword,
      role: 'customer' as UserRole,
      active: true,
      address: `${Math.floor(Math.random() * 1000) + 1} ${city} Street, ${city}`,
      phone: `+1${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
      bio: 'Customer Account'
    };
  });

  return [...agencyUsers, ...customers];
};

export const seedUsers = async (): Promise<void> => {
  try {
    // Delete all existing users
    await User.deleteMany({});
    logger.info('Cleaned up existing users');

    // Generate and insert new users
    const users = await generateTestUsers();
    await User.insertMany(users);
    
    logger.info(`Successfully seeded ${users.length} users`);
    logger.info('Seed users credentials:');
    logger.info('Agency Users:');
    logger.info('- Admin: admin@agency.com / password123');
    logger.info('- Marketing Manager: manager.marketing@agency.com / password123');
    logger.info('- Development Manager: manager.dev@agency.com / password123');
    logger.info('- Sales Employee: sales@agency.com / password123');
    logger.info('- Designer: designer@agency.com / password123');
    logger.info('\nCustomer Users:');
    logger.info('All customers have password: password123');
    logger.info('Emails format: customerN.firstname.lastname@customer.com');
    logger.info('Example: customer1.john.smith@customer.com');
  } catch (error) {
    logger.error('Error seeding users:', error);
    throw error;
  }
};