import { ProductDataBase } from './../database/ProductDataBase';
import { DeliveryDataBase } from '../database/DeliveryDataBase';
import { OrderDataBase } from '../database/OrderDataBase';
import { IDeliveryInputDB, IDeliveryInputDTO } from '../models/Delivery';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class DeliveryBusiness {
  constructor(
    public orderDataBase: OrderDataBase,
    public deliveryDataBase: DeliveryDataBase,
    public productDataBase: ProductDataBase,
    public idGenerator: IdGenerator,
    public authenticator: Authenticator
  ) {}

  public deliveryOrder = async (input: IDeliveryInputDTO) => {
    const token = input.token;
    const receiveUserName = input.receiveUserName;
    const deliveryDate = input.deliveryDate;

    if (!token || typeof token !== 'string') {
      throw new Error('Token inexistente ou incorreto');
    }

    if (!receiveUserName || typeof receiveUserName !== 'string') {
      throw new Error(
        'Favor informar o nome do responsável por receber seus pedidos'
      );
    }

    if (!deliveryDate || typeof deliveryDate !== 'string') {
      throw new Error('Informe a data que deseja receber as compras');
    }

    const userId = this.authenticator.getTokenPayload(token).id;

    const purchaseList = await this.orderDataBase.selectOrders(userId);

    for (const order of purchaseList) {
      const product = await this.productDataBase.getProductById(order.product_id)
      const newStock = product.qty_stock - order.product_qty;
      await this.deliveryDataBase.updateStock(order.product_id, newStock);
    }

    const id: string = this.idGenerator.generate();
    const inputDB: IDeliveryInputDB = {
      id,
      receiveUserName,
      deliveryDate,
      userId,
    };
    const orderDelivery = await this.deliveryDataBase.finishOrder(inputDB);

    return {
      deliveryInfo: orderDelivery,
      orders: purchaseList,
    };
  };

  public getDeliveryOrders = async (input: string) => {
    const token = input;
    if (!token || typeof token !== 'string') {
      throw new Error('Token inexistente ou incorreto');
    }

    const userId = this.authenticator.getTokenPayload(token).id;

    const deliveryOrders = await this.deliveryDataBase.getDeliveryOrders(
      userId
    );
    return deliveryOrders;
  };
}
