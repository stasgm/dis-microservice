import entityModel from '../../models/firebird/entity.model';
import log from '../../logger/log';
import { DataNotFoundException } from '../../exceptions/datanotfound.exception';
import { Entity } from '../../models/firebird/interfaces/entity.interface';

/**
 * Entity data access functions
 */
export class EntityDao {
  /**
   * Find all entities
   * @exception DataNotFoundException if no data in "entity"
   * @return a promise with all entities (containing id and entity_name)
   */
  public async findAllEntity(): Promise<Entity[]> {
    log.info(`DAO : findAll() - entities`);
    const value = await entityModel.findAll();
    if (value === null) {
      throw new DataNotFoundException('- no entity');
    }
    return value;
  }

  /**
   * Find one entity for a given entity_name
   * @param entityName the entityName for the finding
   * @exception DataNotFoundException if no entity for the given entity_name
   * @return a promise with the full entitys (no select)
   */
  public async findOneByEntityName(name: string): Promise<Entity> {
    log.info(`DAO : findOneByEntityName() - ${name}`);
    const value = await entityModel.findOne({ name });
    if (value === null) {
      throw new DataNotFoundException(`- no entity for entity_name = ${name}`);
    }
    return value[0];
  }
}
