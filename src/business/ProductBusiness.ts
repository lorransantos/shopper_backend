import { ProductDataBase } from '../database/ProductDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class ProductBusiness {
  constructor(
    public productDataBase: ProductDataBase,
    public idGenerator: IdGenerator,
    public authenticator: Authenticator
  ) {}
  public getProducts = async (input: string) => {
    const token = input;

    if (!token) {
      throw new Error('Autorização negada');
    }

    const response = await this.productDataBase.getProducts();
    return response;
  };
}
