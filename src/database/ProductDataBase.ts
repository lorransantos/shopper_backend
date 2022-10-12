import {
  IGetProductByIdInputDTO,
  IGetProductByIdOutput,
} from './../models/Product';
import { Product } from '../models/Product';
import { BaseDatabase } from './BaseDataBase';

export class ProductDataBase extends BaseDatabase {
  public static TABLE_PRODUCTS = 'products';

  public getProducts = async (): Promise<Product[]> => {
    return await BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS);
  };

  public getProductById = async (
    input: IGetProductByIdInputDTO
  ): Promise<IGetProductByIdOutput> => {
    const productId = input.productId;
    const [response] = await BaseDatabase.connection(
      ProductDataBase.TABLE_PRODUCTS
    ).where({ id: productId });
    return response;
  };
}
