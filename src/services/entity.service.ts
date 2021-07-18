import { EntityDao } from '../dao/firebird/entity.dao';
import { Entity } from '../models/firebird/interfaces/entity.interface';

/**
 * Entity service
 */
export class EntityService {
  private entityDao: EntityDao;

  constructor() {
    this.entityDao = new EntityDao();
  }

  public findAllEntity(): Promise<Entity[]> {
    return this.entityDao.findAllEntity();
  }

  public findOneByEntityName(name: string): Promise<Entity> {
    return this.entityDao.findOneByEntityName(name);
  }
}
