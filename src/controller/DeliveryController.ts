import { Request, Response } from 'express';
import { DeliveryBusiness } from '../business/DeliveryBusiness';
import { IDeliveryInputDTO } from '../models/Delivery';

export class DeliveryController {
  constructor(public deliveryBusiness: DeliveryBusiness) {}

  public deliveryOrder = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;
      const { receiveUserName, deliveryDate } = req.body as {
        receiveUserName: string;
        deliveryDate: string;
      };

      const input: IDeliveryInputDTO = {
        token,
        receiveUserName,
        deliveryDate,
      };

      const result = await this.deliveryBusiness.deliveryOrder(input);

      res.status(201).send(result);
    } catch (error: any) {
      res.status(400).send(error.sqlMessage || { message: error.message });
    }
  };

  public getDeliveryOrders = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string;

      const result = await this.deliveryBusiness.getDeliveryOrders(token);

      res.status(201).send(result);
    } catch (error: any) {
      res.status(400).send(error.sqlMessage || { message: error.message });
    }
  };
}
