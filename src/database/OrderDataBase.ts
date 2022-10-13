import { ProductDataBase } from './ProductDataBase';
import {
  IAlterOrderQtyIntputDTO,
  IDeleteInputDTO,
  IGetOrderByIdOutputDB,
  IGetOrderByProductIdInputDTO,
  IGetOrderByProductIdOutputDB,
  IGetQtyStockInputDTO,
  IGetQtyStockOutputDB,
  IOrdersOutputDB,
  ISelectOrdersInputDTO,
  Order,
} from '../models/Order';
import { BaseDatabase } from './BaseDataBase';

export class OrderDataBase extends BaseDatabase {
  public static TABLE_ORDER = 'orders_list';
  public static TABLE_FINISH_ORDER = 'orders_delivery';

  public getQtyStock = async (
    input: IGetQtyStockInputDTO
  ): Promise<IGetQtyStockOutputDB> => {
    const productId = input.productId;

    const [response] = await BaseDatabase.connection(
      ProductDataBase.TABLE_PRODUCTS
    )
      .select('qty_stock')
      .where({ id: productId });
    return response;
  };

  public getOrderByProductId = async (
    input: IGetOrderByProductIdInputDTO
  ): Promise<IGetOrderByProductIdOutputDB> => {
    const userId = input.userId;
    const productId = input.productId;

    const [result] = await BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
      .where({ user_id: userId })
      .where({ product_id: productId });
    return result;
  };

  public getOrderById = async (
    input: IDeleteInputDTO
  ): Promise<IGetOrderByIdOutputDB> => {
    const orderId = input.orderId;

    const [response] = await BaseDatabase.connection(
      OrderDataBase.TABLE_ORDER
    ).where({ id: orderId });
    return response;
  };

  public addOrder = async (order: Order): Promise<void> => {
    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER).insert({
      id: order.getId(),
      product_id: order.getProductId(),
      user_id: order.getUserId(),
    });
  };

  public alterOrderQty = async (
    input: IAlterOrderQtyIntputDTO
  ): Promise<void> => {
    const incremento = input.incremento;
    const productId = input.productId;
    const userId = input.userId;

    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
      .update({ product_qty: incremento })
      .where({ product_id: productId })
      .where({ user_id: userId });
  };

  public selectOrders = async (
    input: ISelectOrdersInputDTO
  ): Promise<IOrdersOutputDB[]> => {
    const id = input.userId;
    const result: IOrdersOutputDB[] = await BaseDatabase.connection(
      OrderDataBase.TABLE_ORDER
    )
      .select(
        `${OrderDataBase.TABLE_ORDER}.id`,
        `${OrderDataBase.TABLE_ORDER}.product_id`,
        `${ProductDataBase.TABLE_PRODUCTS}.name`,
        `${ProductDataBase.TABLE_PRODUCTS}.price`,
        `${OrderDataBase.TABLE_ORDER}.product_qty`
      )
      .innerJoin(
        `${ProductDataBase.TABLE_PRODUCTS}`,
        `${ProductDataBase.TABLE_PRODUCTS}.id`,
        `${OrderDataBase.TABLE_ORDER}.product_id`
      )
      .where({ user_id: id });
    return result;
  };

  public deleteOrder = async (input: IDeleteInputDTO): Promise<void> => {
    const orderId = input.orderId;

    await BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
      .delete()
      .where({ id: orderId });
  };
}
