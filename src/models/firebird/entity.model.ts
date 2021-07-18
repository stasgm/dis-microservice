import { ATransaction } from 'gdmn-db';
import { driver, dbOptions } from '../../config/firebird';
import { Entity } from './interfaces/entity.interface';

class EntityModel {
  public findAll = async () => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    const sql = `SELECT
        RELATIONNAME,
        LNAME
      FROM
        AT_RELATIONS`;

    const resultSet = await con.executeQuery(transaction, sql);

    const entities: Entity[] = [];

    while (await resultSet.next()) {
      entities.push({ name: resultSet.getString('RELATIONNAME'), lname: resultSet.getString('LNAME') });
    }

    await resultSet.close();
    await transaction.rollback();
    await con.disconnect();

    return entities;
  };

  public findOne = async ({ name }: { name: string }) => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    let sql = `
      SELECT
        RELATIONNAME,
        LNAME
      FROM
        AT_RELATIONS
      WHERE
        RELATIONNAME = UPPER(:NAME)`;

    const params = [name];

    const resultSet = await con.executeQuery(transaction, sql, params);

    const entities: Entity[] = [];

    while (await resultSet.next()) {
      entities.push({ name: resultSet.getString('RELATIONNAME'), lname: resultSet.getString('LNAME') });
    }

    await resultSet.close();

    sql = `
      SELECT
        RELATIONNAME,
        LNAME
      FROM
        AT_RELATIONS
      WHERE
        RELATIONNAME = UPPER(:NAME)`;

    await transaction.rollback();
    await con.disconnect();

    return entities;
  };
}

export default new EntityModel();
