import { Router } from 'express';
import { DeliveryBusiness } from '../business/DeliveryBusiness';
import { DeliveryController } from '../controller/DeliveryController';
import { DeliveryDataBase } from '../database/DeliveryDataBase';
import { OrderDataBase } from '../database/OrderDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const deliveryRouter = Router();

const deliveryController = new DeliveryController(
  new DeliveryBusiness(
    new OrderDataBase(),
    new DeliveryDataBase(),
    new IdGenerator(),
    new Authenticator()
  )
);

deliveryRouter.post('/add-delivery', deliveryController.deliveryOrder);
deliveryRouter.get('/', deliveryController.getDeliveryOrders);
