import { OrderDataBase } from '../database/OrderDataBase';
import {
  IAddOrderInputDTO,
  IDeleteOrderInputDTO,
  IGetOrderInputDTO,
  Order,
} from '../models/Order';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class OrderBusiness {
  constructor(
    public orderDataBase: OrderDataBase,
    public idGenerator: IdGenerator,
    public authenticator: Authenticator
  ) {}

  public addOrder = async (input: IAddOrderInputDTO) => {
    const token = input.token;
    const productId = input.productId;
    let quantity = input.quantity;

    if (!token) {
      throw new Error('Autorização negada');
    }
    if (!quantity) {
      quantity = + 1
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;

    // const checkStock = await this.productBusiness.getProducts(userId)
    const checkStock = await this.orderDataBase.getQtyStock(productId);

    if (checkStock.qty_stock < quantity) {
      throw new Error('Quantidade desejada acima da existente em estoque')
    }
    
    const checkOrder = await this.orderDataBase.getOrderByProductId(productId, userId);
    
    if (checkOrder) {
      let tete = checkOrder.product_qty
      const incremento = tete + quantity 

      const validation = checkOrder.product_qty + incremento
      
      if (validation > checkStock.qty_stock) {
        throw new Error('Quantidade desejada acima da existente em estoque')
      }

      await this.orderDataBase.alterOrderQty(incremento, productId, userId)

      return 'Alterado com sucesso!'
    } else {
      const id: string = this.idGenerator.generate();
      const order = new Order(id, productId, userId, quantity);
      await this.orderDataBase.addOrder(order);
  
      const response = 'Adicionado ao carrinho';
      return response;
    }    
  };

  public getOrders = async (input: IGetOrderInputDTO) => {
    const token = input.token;
    if (!token) {
      throw new Error('Autorização negada');
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;
    const response = await this.orderDataBase.selectOrders(userId);

    return response;
  };

  public deleteOrder = async (input: IDeleteOrderInputDTO) => {
    const token = input.token;
    const orderId = input.orderId;
    if (!token) {
      throw new Error('Autorização negada');
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;

    await this.orderDataBase.deleteOrder(orderId);
    return 'Item deletado com sucesso!';
  };

  public finishOrder = async (
    reciveUserName: string,
    deliveryDate: string,
    token: string
  ) => {
    const userId = this.authenticator.getTokenPayload(token).id;
    const purchaseList = await this.orderDataBase.selectOrders(userId);

    const test = purchaseList.map((item) => item);

    const id: string = this.idGenerator.generate();

    const orderDelivery = await this.orderDataBase.finishOrder(
      id,
      reciveUserName,
      deliveryDate
    );

    return {
      deliveryInfo: orderDelivery,
      orders: test,
    };
  };
}
