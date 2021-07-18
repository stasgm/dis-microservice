import { InvalidParameterException } from '../exceptions/invalidparameter.exception';
import { EntityService } from '../services/entity.service';

/**
 * Controller managing entitys requests and responses
 */
export class EntityController {
  private entityService: EntityService;

  constructor() {
    this.entityService = new EntityService();
  }

  /**
   * Find all entities, and return them in a json
   * @param req rest request
   * @param res rest response
   * @param next middleware, the error handling
   */
  public findAllEntity(req: any, res: any, next: any) {
    try {
      this.entityService
        .findAllEntity()
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find one entity by entity_name, and returns it in a json
   * @param req rest request, with the entityName
   * @param res rest response
   * @param next middleware, the error handling
   */
  public findOneByEntityName(req: any, res: any, next: any) {
    try {
      if (!('entityName' in req.params) || !req.params.entityName) {
        next(new InvalidParameterException(': /api/entity/:entityName - entityName is required'));
      }
      // console.log('req:', req.params);
      this.entityService
        .findOneByEntityName(req.params.entityName)
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
}
