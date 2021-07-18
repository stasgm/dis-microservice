import { DocumentStateDao } from '../dao/firebird/documentState.dao';
import { DisApprovalResult, DisResponse } from '../models/firebird/interfaces/document.interface';

/**
 * Document service
 */
export class DocumentStateService {
  private documentStateDao: DocumentStateDao;

  constructor() {
    this.documentStateDao = new DocumentStateDao();
  }

  public updateOneByUid(req: DisApprovalResult): Promise<DisResponse> {
    return this.documentStateDao.updateOneByUid(req);
  }
}
