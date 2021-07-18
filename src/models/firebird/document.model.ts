import { ATransaction } from 'gdmn-db';
import { driver, dbOptions } from '../../config/firebird';
import { Document } from './interfaces/document.interface';

class DocumentModel {
  public findAll = async () => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    const sql = `
      SELECT
        Z.NUMBER,
        Z.DOCUMENTDATE,
        DT.USR$DOCTYPENAME DOCTYPE,
        E.USR$DIS_LOGIN CREATOR,
        U.USR$UID UID,
        S.USR$NAME STATUS
      FROM
        GD_DOCUMENT Z
        JOIN USR$DIS_DOCUMENT U ON U.DOCUMENTKEY = Z.ID
        LEFT JOIN USR$DIS_DOCUMENTTYPE DT ON DT.ID = U.USR$DOCTYPEKEY
        LEFT JOIN USR$DIS_DOCUMENT_STATUS S ON S.ID  =  U.USR$STATUSKEY
        LEFT JOIN GD_EMPLOYEE E ON E.CONTACTKEY = Z.CREATORKEY`;

    const resultSet = await con.executeQuery(transaction, sql);

    const document: Document[] = [];

    while (await resultSet.next()) {
      document.push({
        creator: resultSet.getString('CREATOR'),
        date: resultSet.getDate('DOCUMENTDATE')!,
        docType: resultSet.getString('DOCTYPE'),
        number: resultSet.getString('NUMBER'),
        status: resultSet.getString('STATUS'),
        uid: resultSet.getString('UID'),
      });
    }

    await resultSet.close();
    await transaction.rollback();
    await con.disconnect();

    return document;
  };

  public findOne = async ({ uid }: { uid: string }) => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    const sql = `
      SELECT
        Z.NUMBER,
        Z.DOCUMENTDATE,
        DT.USR$DOCTYPENAME DOCTYPE,
        E.USR$DIS_LOGIN CREATOR,
        U.USR$UID UID,
        S.USR$NAME STATUS
      FROM
        GD_DOCUMENT Z
        JOIN USR$DIS_DOCUMENT U ON U.DOCUMENTKEY = Z.ID
        LEFT JOIN USR$DIS_DOCUMENTTYPE DT ON DT.ID = U.USR$DOCTYPEKEY
        LEFT JOIN USR$DIS_DOCUMENT_STATUS S ON S.ID  =  U.USR$STATUSKEY
        LEFT JOIN GD_EMPLOYEE E ON E.CONTACTKEY = Z.CREATORKEY
      WHERE  
        U.USR$UID = :UID `;

    const params = [uid];

    const resultSet = await con.executeQuery(transaction, sql, params);

    const document: Document[] = [];

    while (await resultSet.next()) {
      document.push({
        creator: resultSet.getString('CREATOR'),
        date: resultSet.getDate('DOCUMENTDATE')!,
        docType: resultSet.getString('DOCTYPE'),
        number: resultSet.getString('NUMBER'),
        status: resultSet.getString('STATUS'),
        uid: resultSet.getString('UID'),
      });
    }

    await resultSet.close();

    await transaction.rollback();
    await con.disconnect();

    return document;
  };

  // public updateOne = async (req: DisApprovalResult) => {
  //   const con = driver.newConnection();
  //   await con.connect(dbOptions);

  //   const transaction: ATransaction = await con.startTransaction();

  //   const sql = `
  //     UPDATE
  //       USR$DIS_DOCUMENT U
  //     SET
  //       U.USR$REG_DATE = :REG_DATE,
  //       U.USR$REG_NUMBER = :REG_NUMBER,
  //       U.USR$STATUSKEY = (SELECT ID FROM GD_RUID WHERE XID=195578358 AND DBID=1199644481)
  //     WHERE
  //       U.USR$UID = :UID
  //     RETURNING
  //       U.DOCUMENTKEY
  //   `;

  //   const [regDate, regNum, uid] = req;
  //   const params = [regDate, regNum, uid];

  //   const resultSet = await con.executeReturning(transaction, sql, params);

  //   const documentkey: number = resultSet.getNumber('DOCUMENTKEY');

  //   await transaction.commit();
  //   await con.disconnect();

  //   return documentkey;
  // }
}

export default new DocumentModel();
