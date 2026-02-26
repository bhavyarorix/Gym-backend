import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Test auth routes
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Auth routes are working
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Auth routes are working!
 */
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *         examples:
 *           emailExists:
 *             value:
 *               success: false
 *               message: Email already exists
 *               error: Email already exists
 *           validationError:
 *             value:
 *               success: false
 *               message: Validation error
 *               error: Invalid input data
 */
router.post(
  '/register',
  authController.register.bind(authController)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *         examples:
 *           invalidCredentials:
 *             value:
 *               success: false
 *               message: Invalid email or password
 *               error: Invalid email or password
 *           accountDeactivated:
 *             value:
 *               success: false
 *               message: Account is deactivated. Please contact admin.
 *               error: Account is deactivated. Please contact admin.
 */
router.post('/login', authController.login.bind(authController));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
// router.get('/profile', authController.getProfile.bind(authController));

export default router;