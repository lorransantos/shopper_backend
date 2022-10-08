import { ProductDataBase } from './ProductDataBase';
import { IOrdersOutputDB, Order } from '../models/Order';
import { BaseDatabase } from './BaseDataBase';

export class OrderDataBase extends BaseDatabase {
  public static TABLE_ORDER = 'shopping_order';
  public static TABLE_ORDER2 = 'orders_list';
  public static TABLE_FINISH_ORDER = 'orders_delivery';

  public getQtyStock = async (productId: string) => {
    const [response] = await BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS)
    .select('qty_stock')
    .where({id: productId});
    return response
  }

  public getOrderByProductId = async (productId: string, userId: string) => {
    const [result] = await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2)
      .where({ user_id: userId }).where({product_id: productId})
    return result;
  };

  public addOrder = async (order: Order) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2).insert({
      id: order.getId(),
      product_id: order.getProductId(),
      user_id: order.getUserId(),
    });
  };

  public alterOrderQty = async (incremento: number, productId: string, userId: string,) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2)
    .update({ product_qty: incremento })
    .where({product_id: productId})
    .where({user_id: userId});
  };

  public selectOrders = async (id: string): Promise<IOrdersOutputDB[]> => {
    const result: IOrdersOutputDB[] = await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2)
      .select(
        'orders_list.id',
        `${OrderDataBase.TABLE_ORDER2}.product_id`,
        'products.name',
        'products.price',
        'orders_list.product_qty'
      )
      // .innerJoin('Users', 'Users.id', `${OrderDataBase.TABLE_ORDER}.user_id`)
      .innerJoin(
        'products',
        `${ProductDataBase.TABLE_PRODUCTS}.id`,
        `${OrderDataBase.TABLE_ORDER2}.product_id`
      )
      // .count('products.id')
      // .groupBy('product_id')
      .where({ user_id: id })
    return result;
  };

  public deleteOrder = async (orderId: string) => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER2)
      .delete()
      .where({ id: orderId });
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
