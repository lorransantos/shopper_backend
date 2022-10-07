import { Order } from '../models/Order';
import { BaseDatabase } from './BaseDataBase';

export class OrderDataBase extends BaseDatabase {
  public static TABLE_ORDER = 'shopping_order';
  public static TABLE_ORDER2 = 'orders_list';
  public static TABLE_FINISH_ORDER = 'orders_delivery';

  // public getNameById = async (id: string) => {
  //   const [result] = await BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
  //     .select('Users.name')
  //     .innerJoin('Users', 'Users.id', `${OrderDataBase.TABLE_ORDER}.user_id`)
  //     .groupBy('Users.id')
  //     .where({ user_id: id });
  //   return result.name;
  // };

  public addOrder = async (order: Order) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2).insert({
      id: order.getId(),
      product_id: order.getProductId(),
      user_id: order.getUserId(),
    });
  };

  public selectOrders = async (id: string) => {
    const result = await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2)
      .select(
        'orders_list.id',
        // 'products.id',
        'products.name',
        'products.price',
        'orders_list.product_qty'
      )
      // .innerJoin('Users', 'Users.id', `${OrderDataBase.TABLE_ORDER}.user_id`)
      .innerJoin(
        'products',
        'products.id',
        `${OrderDataBase.TABLE_ORDER2}.product_id`
      )
      // .count('products.id')
      // .groupBy('products.id')
      .where({ user_id: id });
    return result;
  };

  public deleteOrder = async (productId: string) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
      .delete()
      .where({ product_id: productId });
  };

  public finishOrder = async (
    id: string,
    reciveUserName: string,
    deliveryDate: string
  ) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_FINISH_ORDER).insert({
      id,
      reciveUserName: reciveUserName,
      deliveryDate: deliveryDate,
    });

    const response = await BaseDatabase.connection(
      OrderDataBase.TABLE_FINISH_ORDER
    );

    return response;
  };
}
