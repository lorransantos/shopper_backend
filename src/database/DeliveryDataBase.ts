import { IDeliveryInputDB } from '../models/Delivery';
import { BaseDatabase } from './BaseDataBase';

export class DeliveryDataBase extends BaseDatabase {
  public static TABLE_ORDER = 'shopping_order';
  public static TABLE_ORDER2 = 'orders_list';
  public static TABLE_FINISH_ORDER = 'orders_delivery';

  public finishOrder = async (input: IDeliveryInputDB) => {
    const receiveUserName = input.receiveUserName;
    const deliveryDate = input.deliveryDate;
    const id = input.id;
    const userId = input.userId;
    await BaseDatabase.connection(DeliveryDataBase.TABLE_FINISH_ORDER).insert({
      id,
      reciveUserName: receiveUserName,
      deliveryDate: deliveryDate,
      user_id: userId,
    });

    const response = await BaseDatabase.connection(
      DeliveryDataBase.TABLE_FINISH_ORDER
    ).where({ user_id: userId });

    return response;
  };

  public getDeliveryOrders = async (userId: string) => {
    const response = await BaseDatabase.connection(
      DeliveryDataBase.TABLE_FINISH_ORDER
    ).where({ user_id: userId });
    return response;
  };
}