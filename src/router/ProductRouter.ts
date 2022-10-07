import { Router } from 'express';
import { ProductBusiness } from '../business/ProductBusiness';
import { ProductController } from '../controller/ProductController';
import { ProductDataBase } from '../database/ProductDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const productRouter = Router();

const productController = new ProductController(
  new ProductBusiness(
    new ProductDataBase(),
    new IdGenerator(),
    new Authenticator()
  )
);

productRouter.get('/', productController.getProducts);
