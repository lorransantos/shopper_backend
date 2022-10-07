import { OrderDataBase } from '../database/OrderDataBase';
import {
  IAddOrderInputDB,
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

    if (!token) {
      throw new Error('Autorização negada');
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;
    const id: string = this.idGenerator.generate();

    const order = new Order(id, productId, userId);

    await this.orderDataBase.addOrder(order);

    const response = 'Adicionado ao carrinho';
    return response;
  };

  public getOrders = async (input: IGetOrderInputDTO) => {
    const token = input.token;
    if (!token) {
      throw new Error('Autorização negada');
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;

    // const userName = await this.orderDataBase.getNameById(userId);
    const response = await this.orderDataBase.selectOrders(userId);
    // const test = response.map((item) => {
    //   return {
    //     teste: item.name,
    //     teste2: item.price,
    //   };
    // });
    return response;
  };

  public deleteOrder = async (input: IDeleteOrderInputDTO) => {
    const token = input.token;
    const productId = input.productId;
    if (!token) {
      throw new Error('Autorização negada');
    }

    console.log('teste');

    const userId: string = this.authenticator.getTokenPayload(token).id;

    await this.orderDataBase.deleteOrder(productId);
    return 'Item deletado com sucesso!';
  };

  public finishOrder = async (
    reciveUserName: string,
    deliveryDate: string,
    token: string
  ) => {
    //  purchaseList
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
