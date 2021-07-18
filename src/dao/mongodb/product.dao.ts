import productModel from '../../models/mongodb/product.model';
import log from '../../logger/log';
import { DataNotFoundException } from '../../exceptions/datanotfound.exception';
import { Product } from '../../models/mongodb/interfaces/product.interface';

/**
 * Product data access functions
 */
export class ProductDao {
  /**
   * Find all product's code
   * @exception DataNotFoundException if no data in "product" collection
   * @return a promise with all products (containing the document _id and product_code)
   */
  public async findAllProductCode(): Promise<Product[]> {
    log.info(`DAO : findAll() - products`);
    const value = await productModel.find().select('code').exec();
    if (value === null) {
      throw new DataNotFoundException('- no code');
    }
    return value;
  }

  /**
   * Find one product for a given product_code
   * @param productCode the productCode for the finding
   * @exception DataNotFoundException if no product for the given product_code
   * @return a promise with the full products (no select)
   */
  public async findOneByProductCode(code: string): Promise<Product> {
    log.info(`DAO : findOneByproductCode() - ${code}`);
    const value = await productModel.findOne({ code }).exec();
    if (value === null) {
      throw new DataNotFoundException(`- no product for product_code = ${code}`);
    }
    return value;
  }
}
