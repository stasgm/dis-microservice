import { ATransaction } from 'gdmn-db';
import { driver, dbOptions } from '../../config/firebird';

class DocumentStateModel {
  public updateOne = async (req: { disUid: string; regDate?: Date; regNum?: string }) => {
    const { disUid, regNum, regDate } = req;

    const con = driver.newConnection();

    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    let sql = `
      UPDATE
        USR$DIS_DOCUMENT U
      SET
        U.USR$REG_DATE = :REG_DATE,
        U.USR$REG_NUMBER = :REG_NUMBER,
        U.USR$STATUSKEY = (SELECT ID FROM GD_RUID WHERE XID=195578358 AND DBID=1199644481)
      WHERE
        U.USR$UID = :UID
      RETURNING
        U.DOCUMENTKEY
    `;

    let params = [regDate, regNum, disUid];

    const resultSet = await con.executeReturning(transaction, sql, params);

    const documentkey: number = resultSet.getNumber('DOCUMENTKEY');

    sql = `
      INSERT INTO USR$DIS_DOCUMENT_LOG 
        (USR$MASTERKEY, USR$TYPE, USR$RESULT_CODE, USR$RESULT_DESCRIPTION, USR$RESULT_JSON) 
      VALUES 
        (:MASTERKEY, :ATYPE, :RESCODE, :RESDESCR, :RES_JSON) 
    `;

    params = [documentkey.toString(), 'РЕЗУЛЬТАТ', '0', 'Документ подписан', ''];

    await con.executeReturning(transaction, sql, params);

    await transaction.commit();
    await con.disconnect();

    return documentkey;
  };

  public updateOneWithError = async (req: { disUid: string; reason?: string }) => {
    const { disUid, reason } = req;
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    let sql = `
      UPDATE
        USR$DIS_DOCUMENT U
      SET
        U.USR$STATUSKEY = (SELECT ID FROM GD_RUID WHERE XID=195578359 AND DBID=1199644481)
      WHERE
        U.USR$UID = :UID
      RETURNING
        U.DOCUMENTKEY
    `;

    let params = [disUid];

    const resultSet = await con.executeReturning(transaction, sql, params);

    const documentkey: number = resultSet.getNumber('DOCUMENTKEY');

    sql = `
      INSERT INTO USR$DIS_DOCUMENT_LOG
        (USR$MASTERKEY, USR$TYPE, USR$RESULT_CODE, USR$RESULT_DESCRIPTION)
      VALUES
        (:MASTERKEY, :ATYPE, :RESCODE, :RESDESCR)
    `;

    params = [documentkey.toString(), 'РЕЗУЛЬТАТ', '-1', reason || ''];

    await con.executeReturning(transaction, sql, params);

    await transaction.commit();
    await con.disconnect();

    return documentkey;
  };
}

export default new DocumentStateModel();
