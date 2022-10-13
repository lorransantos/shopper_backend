import { Request, Response } from 'express';
import { OrderBusiness } from '../business/OrderBusiness';
import {
  IAddOrderInputDTO,
  IDeleteOrderInputDTO,
  IGetOrderInputDTO,
} from '../models/Order';

export class OrderController {
  constructor(public orderBusiness: OrderBusiness) {}

  public addOrder = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const productId: string = req.body.productId as string;
      const quantity: number = req.body.quantity as number;

      const input: IAddOrderInputDTO = {
        token,
        productId,
        quantity,
      };

      const response = await this.orderBusiness.addOrder(input);

      res.status(201).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };

  public getOrders = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;

      const input: IGetOrderInputDTO = {
        token,
      };

      const response = await this.orderBusiness.getOrders(input);

      res.status(200).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };

  public deleteOrders = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const orderId: string = req.body.orderId as string;

      const input: IDeleteOrderInputDTO = {
        token,
        orderId,
      };

      const response = await this.orderBusiness.deleteOrder(input);

      res.status(200).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };
}
