import documentStateModel from '../../models/firebird/documentState.model';
import log from '../../logger/log';
import { DisApprovalResult, DisResponse } from '../../models/firebird/interfaces/document.interface';

/**
 * DocumentState data access functions
 */
export class DocumentStateDao {
  /**
   * Update one documentState for a given uid
   * @param sourceUid the id from source
   * @param disUid the uid for the finding
   * @prarm result the result of approval
   * @param regN the regNumber for the updating
   * @param regDate the regDate for the updating
   * @param regTypeName the regTypeName foe the updating
   * @exception DataNotFoundException if no document for the given uid
   * @return a promise with the full document (no select)
   */
  public async updateOneByUid(req: DisApprovalResult): Promise<DisResponse> {
    const { disUid, result } = req;
    if (result === 'true') {
      // Документ подписан
      const { regDate, regN } = req;
      log.info(`DAO : updateOneByUid() - ${disUid}`);

      const newRegDate: Date | undefined = regDate ? new Date(regDate) : undefined;
      const value = await documentStateModel.updateOne({ disUid, regDate: newRegDate, regNum: regN });

      if (value === null || value === 0) {
        return { resultCode: '0', resultDescription: `документ не найден. uid = ${disUid}` };
      }
      return { resultCode: '1', resultDescription: '' };
    }
    // Документ возвращён
    const { reason } = req;
    log.info(`DAO : updateOneWithErrorByUid() - ${disUid}`);

    const denValue = await documentStateModel.updateOneWithError({ disUid, reason });

    if (denValue === null || denValue === 0 || denValue === undefined) {
      // throw new DocumentNotFoundException({ resultCode: '0', resultDescription: `no document for uid = ${disUid}` });
      return { resultCode: '0', resultDescription: `документ не найден. uid = ${disUid}` };
    }

    return { resultCode: '1', resultDescription: '' };
  }
}
