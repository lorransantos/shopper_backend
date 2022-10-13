import { ProductDataBase } from './../database/ProductDataBase';
import { DeliveryDataBase } from '../database/DeliveryDataBase';
import { OrderDataBase } from '../database/OrderDataBase';
import {
  IDeliveryInputDB,
  IDeliveryInputDTO,
  IFinalizationOutputDTO,
  IGetDeliveryOrdersDTO,
  IGetDeliveryOrdersOutputDB,
} from '../models/Delivery';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { ISelectOrdersInputDTO } from '../models/Order';
import { CustomError } from '../error/CustomError';
import { IGetProductByIdInputDTO } from '../models/Product';

export class DeliveryBusiness {
  constructor(
    public orderDataBase: OrderDataBase,
    public deliveryDataBase: DeliveryDataBase,
    public productDataBase: ProductDataBase,
    public idGenerator: IdGenerator,
    public authenticator: Authenticator
  ) {}

  public deliveryOrder = async (
    input: IDeliveryInputDTO
  ): Promise<IFinalizationOutputDTO> => {
    const token = input.token;
    const receiveUserName = input.receiveUserName;
    const deliveryDate = input.deliveryDate;

    if (!token) {
      throw new CustomError(400, 'Token inexistente');
    }

    if (typeof token !== 'string') {
      throw new CustomError(400, 'Token incorreto');
    }

    if (!receiveUserName) {
      throw new CustomError(
        400,
        'Favor informar o nome do responsável por receber seus pedidos'
      );
    }

    if (typeof receiveUserName !== 'string') {
      throw new CustomError(400, 'Tipo do campo inválido');
    }

    if (!deliveryDate || typeof deliveryDate !== 'string') {
      throw new CustomError(
        400,
        'Informe a data que deseja receber as compras'
      );
    }

    const userId = this.authenticator.getTokenPayload(token).id;

    const inputSelectOrders: ISelectOrdersInputDTO = {
      userId,
    };

    const purchaseList = await this.orderDataBase.selectOrders(
      inputSelectOrders
    );

    for (const order of purchaseList) {
      let inputGetProductById: IGetProductByIdInputDTO = {
        productId: order.product_id,
      };

      const product = await this.productDataBase.getProductById(
        inputGetProductById
      );
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
    const orderDelivery = await this.deliveryDataBase.finalizationOrder(
      inputDB
    );

    return {
      deliveryInfo: orderDelivery,
      orders: purchaseList,
    };
  };

  public getDeliveryOrders = async (
    input: string
  ): Promise<IGetDeliveryOrdersOutputDB[]> => {
    const token = input;
    if (!token || typeof token !== 'string') {
      throw new Error('Token inexistente ou incorreto');
    }

    const userId = this.authenticator.getTokenPayload(token).id;

    const inputGetDeliveryOrders: IGetDeliveryOrdersDTO = {
      userId,
    };

    const deliveryOrders = await this.deliveryDataBase.getDeliveryOrders(
      inputGetDeliveryOrders
    );

    return deliveryOrders;
  };
}
