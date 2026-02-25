import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { MESSAGES } from '../constants/messages';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: MESSAGES.AUTH.REGISTER_SUCCESS,
        data: result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
        error: error.message
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
        data: result
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Login failed',
        error: error.message
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: MESSAGES.AUTH.UNAUTHORIZED
        });
      }

      const user = await authService.getUserById(userId);

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || 'Failed to fetch profile',
        error: error.message
      });
    }
  }
}