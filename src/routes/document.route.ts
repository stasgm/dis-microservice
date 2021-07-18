import { DocumentController } from '../controllers/document.controller';
import { Router } from 'express';

/**
 * "document" api router specifications
 * => API_URL/api/document/
 */
export class DocumentRoute {
  private api: Router = Router();
  private readonly documentController: DocumentController;

  constructor() {
    this.documentController = new DocumentController();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define document routes
   */
  private routes(): void {
    /**
     * @swagger
     * /api/documents:
     *   get:
     *     tags: ["Documents"]
     *     summary: Returns all documents
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
    this.api.get('/', this.documentController.findAll.bind(this.documentController));

    /**
     * @swagger
     * /api/documents/{uid}:
     *   get:
     *     tags: 
     *      - Documents
     *     summary: Returns a document for a given uid
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: path
     *        name: uid
     *        type: string
     *        required: true
     *        description: document uid
     *        examples:
     *          document:
     *            summary: A document example
     *            value: "123" 
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success
     *       404:
     *         description: DataNotFoundException
     *       400:
     *         description: Malformed request syntax (uid required)
     *       500:
     *         description: Error during query execution
     */
    this.api.get('/:uid', this.documentController.findOneByUid.bind(this.documentController));
  }
}
