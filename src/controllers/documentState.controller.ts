import { Request, Response, NextFunction } from 'express';
import { DocumentStateService } from '../services/documentState.service';
import { DisApprovalResult } from '../models/firebird/interfaces/document.interface';
import { DataNotFoundException } from '../exceptions/datanotfound.exception';

/**
 * Controller managing documents requests and responses
 */
export class DocumentStateController {
  private documentStateService: DocumentStateService;

  constructor() {
    this.documentStateService = new DocumentStateService();
  }

  /**
   * Update one document by uid, and returns result in a json
   * @param req rest request, with the uid
   * @param res rest response
   * @param next middleware, the error handling
   */
  public updateOneByUid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!('disUid' in req.body) || !req.body.disUid) {
        throw new DataNotFoundException(': disUid is required');
      }
      if (!('result' in req.body) || !req.body.result) {
        throw new DataNotFoundException(': result is required');
      }
      this.documentStateService
        .updateOneByUid(req.body as DisApprovalResult)
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
}
