import { EntityController } from '../controllers/entity.controller';
import { Router } from 'express';

/**
 * "entity" api router specifications
 * => API_URL/api/entity/
 */
export class EntityRoute {
  private api: Router = Router();
  private readonly entityController: EntityController;

  constructor() {
    this.entityController = new EntityController();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define entitys routes
   */
  private routes(): void {
    /**
     * @swagger
     * /api/entity:
     *   get:
     *     tags: ["Entity"]
     *     summary: Returns all entities
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: DataNotFoundException
     *       500:
     *         description: Error during query execution
     */
    this.api.get('/', this.entityController.findAllEntity.bind(this.entityController));

    /**
     * @swagger
     * /api/entity/{entityName}:
     *   get:
     *     tags: ["Entity"]
     *     summary: Returns a entity for a given entityName
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: path
     *        name: entityName
     *        type: string
     *        required: true
     *        description: Entity name
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: DataNotFoundException
     *       400:
     *         description: Malformed request syntax (entityName required)
     *       500:
     *         description: Error during query execution
     */
    this.api.get('/:entityName', this.entityController.findOneByEntityName.bind(this.entityController));
  }
}
