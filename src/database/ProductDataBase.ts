import { Product } from '../models/Product';
import { BaseDatabase } from './BaseDataBase';

export class ProductDataBase extends BaseDatabase {
  public static TABLE_PRODUCTS = 'products';

  public getProducts = async (): Promise<Product[]> => {
    return await BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS);
  };
}
