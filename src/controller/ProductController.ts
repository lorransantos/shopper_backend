import { Request, Response } from 'express';
import { ProductBusiness } from '../business/ProductBusiness';

export class ProductController {
  constructor(public productBusiness: ProductBusiness) {}

  public getProducts = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;

      const response = await this.productBusiness.getProducts(token);

      res.status(200).send(response);
    } catch (error: any) {
      res.status(400).send(error.sqlMessage || { message: error.message });
    }
  };
}
