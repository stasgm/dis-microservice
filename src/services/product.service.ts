// import { ProductDao } from '../dao/mongodb/product.dao';
// import { Product } from '../models/mongodb/interfaces/product.interface';
import { ProductDao } from '../dao/firebird/product.dao';
import { Product } from '../models/firebird/interfaces/product.interface';

/**
 * Product service
 */
export class ProductService {
  private productDao: ProductDao;

  constructor() {
    this.productDao = new ProductDao();
  }

  public findAllProductCode(): Promise<Product[]> {
    return this.productDao.findAllProductCode();
  }

  public findOneByProductCode(productCode: string): Promise<Product> {
    return this.productDao.findOneByProductCode(productCode);
  }

  /**
   * Fake service 1
   */
  public exampleServiceO(): string {
    return 'O';
  }

  /**
   * Fake service 2
   */
  public exampleServiceK(): string {
    return 'K';
  }
}
