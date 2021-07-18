import documentModel from '../../models/firebird/document.model';
import log from '../../logger/log';
import { DataNotFoundException } from '../../exceptions/datanotfound.exception';
import { Document } from '../../models/firebird/interfaces/document.interface';

/**
 * Document data access functions
 */
export class DocumentDao {
  /**
   * Find all entities
   * @exception DataNotFoundException if no data in "document"
   * @return a promise with all entities (containing id and document_name)
   */
  public async findAll(): Promise<Document[]> {
    log.info(`DAO : findAll() - entities`);
    const value = await documentModel.findAll();
    if (!value.length) {
      throw new DataNotFoundException('- no document');
    }
    return value;
  }

  /**
   * Find one document for a given uid
   * @param uid the uid for the finding
   * @exception DataNotFoundException if no document for the given uid
   * @return a promise with the full document (no select)
   */
  public async findOneByUid(uid: string): Promise<Document> {
    log.info(`DAO : findOneByDocumentUid() - ${uid}`);
    const value = await documentModel.findOne({ uid });
    if (!value.length) {
      throw new DataNotFoundException(`- no document for uid = ${uid}`);
    }
    return value[0];
  }

  /**
   * Update one document for a given uid
   * @param uid the uid for the finding
   * @param regDate the regDate for the updating
   * @param regNum the regNumber for the updating
   * @exception DataNotFoundException if no document for the given uid
   * @return a promise with the full document (no select)
   */
  /* public async updateOneByUid(uid: string, regDate?: string, regNum?: string): Promise<number> {
    log.info(`DAO : updateOneByUid() - ${uid}`);
    
    const newRegDate: Date | undefined = regDate ? new Date(regDate) : undefined;
    log.info('newRegDate' + regDate);
    const value = await documentModel.updateOne({ uid, regDate: newRegDate, regNum });

    if (value === null || value === 0) {
      throw new DataNotFoundException(`- no document for uid = ${uid}`);
    }
    return value;
  }   */
}
