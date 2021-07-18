import { DocumentStateController } from '../controllers/documentState.controller';
import { Router } from 'express';

/**
 * "document" api router specifications
 * => API_URL/api/dis/
 */
export class DocumentStateRoute {
  private api: Router = Router();
  private readonly documentStateController: DocumentStateController;

  constructor() {
    this.documentStateController = new DocumentStateController();
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
     * /api/dis/{uid}:
     *   post:
     *     tags: 
     *      - DocumentState
     *     summary: Updates a single documentState for a given uid
     *     description: Updates a single documentState for a given uid
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: path
     *        name: uid
     *        type: string
     *        required: true
     *        description: document id
     *        examples:
     *          docState1:
     *            summary: A docState1 example
     *            value: "123" 
     *      - name: body 
     *        in: body
     *        description: Fields for the DocumentState resource
     *        required: true
     *        schema:
     *          $ref: '#/definitions/DocumentState'
     *        examples: 
     *          docState1:
     *            summary: A docState1 example
     *            value: {"disUid": "1234", "regDate": "2020-06-30", "refNum": "5678"}
     *
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

    /**
     * @swagger
     * definitions:
     *   DocumentState:
     *     type: object
     *     title: documentState
     *     required:
     *       - uid
     *     properties:
     *       disUid:
     *         type: string
     *       regDate:
     *         type: string
     *       refNum:
     *         type: string
     */

    this.api.post('/', this.documentStateController.updateOneByUid.bind(this.documentStateController));
  }
}
