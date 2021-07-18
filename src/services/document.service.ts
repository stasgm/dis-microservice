import { DocumentDao } from '../dao/firebird/document.dao';
import { Document } from '../models/firebird/interfaces/document.interface';

/**
 * Document service
 */
export class DocumentService {
  private documentDao: DocumentDao;

  constructor() {
    this.documentDao = new DocumentDao();
  }

  public findAll(): Promise<Document[]> {
    return this.documentDao.findAll();
  }

  public findOneByUid(uid: string): Promise<Document> {
    return this.documentDao.findOneByUid(uid);
  }
}
