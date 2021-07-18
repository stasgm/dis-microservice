import { Request, Response, NextFunction } from 'express';
import { InvalidParameterException } from '../exceptions/invalidparameter.exception';
import { DocumentService } from '../services/document.service';

/**
 * Controller managing documents requests and responses
 */
export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  /**
   * Find all entities, and return them in a json
   * @param req rest request
   * @param res rest response
   * @param next middleware, the error handling
   */
  public findAll(req: Request, res: Response, next: NextFunction) {
    try {
      this.documentService
        .findAll()
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find one document by uid, and returns it in a json
   * @param req rest request, with the uid
   * @param res rest response
   * @param next middleware, the error handling
   */
  public findOneByUid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!('uid' in req.params) || !req.params.uid) {
        throw new InvalidParameterException(': /api/document/:uid - uid is required');
      }
      this.documentService
        .findOneByUid(req.params.uid)
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
}
