import { ProductDataBase } from './ProductDataBase';
import {
  IDeliveryInputDB,
  IGetDeliveryOrdersDTO,
  IGetDeliveryOrdersOutputDB,
} from '../models/Delivery';
import { BaseDatabase } from './BaseDataBase';

export class DeliveryDataBase extends BaseDatabase {
  public static TABLE_FINISH_ORDER = 'orders_delivery';

  public finalizationOrder = async (input: IDeliveryInputDB) => {
    const receiveUserName = input.receiveUserName;
    const deliveryDate = input.deliveryDate;
    const id = input.id;
    const userId = input.userId;

    await BaseDatabase.connection(DeliveryDataBase.TABLE_FINISH_ORDER).insert({
      id,
      receive_user_name: receiveUserName,
      delivery_date: deliveryDate,
      user_id: userId,
    });

    const response = await BaseDatabase.connection(
      DeliveryDataBase.TABLE_FINISH_ORDER
    ).where({ user_id: userId });

    return response;
  };

  public getDeliveryOrders = async (
    input: IGetDeliveryOrdersDTO
  ): Promise<IGetDeliveryOrdersOutputDB[]> => {
    const userId = input.userId;

    const response = await BaseDatabase.connection(
      DeliveryDataBase.TABLE_FINISH_ORDER
    ).where({ user_id: userId });
    return response;
  };

  public updateStock = async (productId: string, qtyPurchase: number) => {
    await BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS)
      .update({ qty_stock: qtyPurchase })
      .where({ id: productId });
  };
}
