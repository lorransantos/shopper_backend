import { Router } from 'express';
import { OrderBusiness } from '../business/OrderBusiness';
import { ProductBusiness } from '../business/ProductBusiness';
import { OrderController } from '../controller/OrderController';
import { ProductController } from '../controller/ProductController';
import { OrderDataBase } from '../database/OrderDataBase';
import { ProductDataBase } from '../database/ProductDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const orderRouter = Router();

const orderController = new OrderController(
  new OrderBusiness(new OrderDataBase(), new IdGenerator(), new Authenticator())
);

orderRouter.get('/add-order', orderController.addOrder);
orderRouter.get('/', orderController.getOrders);
// orderRouter.delete('/delete-order', orderController.deleteOrders);
orderRouter.post('/finish-order', orderController.finishOrder);
