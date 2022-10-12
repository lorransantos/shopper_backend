import { Request, Response } from 'express';
import { DeliveryBusiness } from '../business/DeliveryBusiness';
import { IDeliveryInputDTO } from '../models/Delivery';

export class DeliveryController {
  constructor(public deliveryBusiness: DeliveryBusiness) {}

  public deliveryOrder = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const { receiveUserName, deliveryDate } = req.body;

      const input: IDeliveryInputDTO = {
        token,
        receiveUserName,
        deliveryDate,
      };

      const response = await this.deliveryBusiness.deliveryOrder(input);

      res.status(201).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };

  public getDeliveryOrders = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;

      const response = await this.deliveryBusiness.getDeliveryOrders(token);

      res.status(201).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };
}
