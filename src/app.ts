import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import authRoutes from "./routes/auth.routes";
import swaggerSpec from "./config/swagger";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Gym Management API Documentation'
}));

// Routes
app.use("/api/v1/auth", authRoutes);

// Health check route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gym Management API Running 🚀
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Gym Management API Running 🚀"
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`
  });
});

export default app;