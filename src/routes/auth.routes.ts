import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
// import { registerValidation, loginValidation } from '../validations/auth.validation';
// import { validate } from '../middlewares/validation.middleware';
// import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

// Public routes
router.post(
  '/register',
//   registerValidation,
//   validate,
  authController.register.bind(authController)
);

// router.post(
//   '/login',
//   loginValidation,
//   validate,
//   authController.login.bind(authController)
// );

// // Protected routes
// router.get(
//   '/profile',
//   authenticate,
//   authController.getProfile.bind(authController)
// );

export default router;