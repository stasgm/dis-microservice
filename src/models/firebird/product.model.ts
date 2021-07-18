import { ATransaction } from 'gdmn-db';
import { driver, dbOptions } from '../../config/firebird';
import { Product } from './interfaces/product.interface';

class ProductModel {
  public findAll = async () => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    const sql = `select name, alias from gd_good`;

    const resultSet = await con.executeQuery(transaction, sql);

    const goods: Product[] = [];

    while (await resultSet.next()) {
      goods.push({ name: resultSet.getString('NAME'), code: resultSet.getString('ALIAS') });
    }

    await resultSet.close();
    await transaction.rollback();
    await con.disconnect();

    return goods;
    // connect().catch(err => console.log(err)).then();
  };

  public findOne = async ({ code }: { code: string }) => {
    const con = driver.newConnection();
    await con.connect(dbOptions);

    const transaction: ATransaction = await con.startTransaction();

    const sql = `select name, alias from gd_good where alias = :code`;

    const params = { code };

    const resultSet = await con.executeQuery(transaction, sql, params);

    const good: Product[] = [];

    while (await resultSet.next()) {
      good.push({ name: resultSet.getString('NAME'), code: resultSet.getString('ALIAS') });
    }

    await resultSet.close();
    await transaction.rollback();
    await con.disconnect();

    return good;
    // connect().catch(err => console.log(err)).then();
  };

  /*   return {
      findAllProductCode,
      findOne
    } */
}

export default new ProductModel();

// export default mongoose.model<Product>('product', ProductSchema);
