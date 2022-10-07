import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './router/UserRouter';
import { productRouter } from './router/ProductRouter';
import { orderRouter } from './router/OrderRouter';
import { deliveryRouter } from './router/DeliveryRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/delivery', deliveryRouter);
