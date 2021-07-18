import { ProductController } from '../controllers/product.controller';
import { Router } from 'express';

/**
 * "manager" api router specifications
 * => API_URL/api/manager/
 */
export class ManagerRoute {
  private api: Router = Router();
  private readonly productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define products routes
   */
  private routes(): void {
    /**
     * @swagger
     * /api/manager/example:
     *   get:
     *     tags: ["Product"]
     *     summary: Returns 'OK' to illustrate usage of a manager
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Error during query execution
     */
    this.api.get('/example', this.productController.health.bind(this.productController));
  }
}
