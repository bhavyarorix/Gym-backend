import bcrypt from 'bcrypt';
import prisma from '../config/prisma';
import { generateToken } from '../utils/jwt.utils';
import { MESSAGES } from '../constants/messages';
// import { MESSAGES } from '../constants/messages';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'ADMIN' | 'TRAINER' | 'MEMBER';
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  async register(userData: RegisterInput) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new Error(MESSAGES.AUTH.EMAIL_EXISTS);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: hashedPassword,
          phone: userData.phone,
          role: userData.role || 'MEMBER'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      return {
        user,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: LoginInput) {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      });

      if (!user) {
        throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated. Please contact admin.');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        throw new Error(MESSAGES.USER.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}