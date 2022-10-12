import { OrderDataBase } from '../database/OrderDataBase';
import { CustomError } from '../error/CustomError';
import {
  IAddOrderInputDTO,
  IAlterOrderQtyIntputDTO,
  IDeleteInputDTO,
  IDeleteOrderInputDTO,
  IGetOrderByProductIdInputDTO,
  IGetOrderInputDTO,
  IGetQtyStockInputDTO,
  IOrdersOutputDB,
  ISelectOrdersInputDTO,
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

  public addOrder = async (input: IAddOrderInputDTO): Promise<string> => {
    const token = input.token;
    const productId = input.productId;
    let quantity = input.quantity;

    if (!token) {
      throw new CustomError(401, 'Token inválido');
    }

    if (!productId) {
      throw new CustomError(404, 'Produto não encontrado');
    }

    if (!quantity) {
      quantity = +1;
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;

    const inputGetQtyStock: IGetQtyStockInputDTO = {
      productId,
    };
    const checkStock = await this.orderDataBase.getQtyStock(inputGetQtyStock);

    if (checkStock.qty_stock < quantity) {
      throw new CustomError(
        409,
        'Quantidade desejada acima da existente em estoque'
      );
    }

    const inputOrderId: IGetOrderByProductIdInputDTO = {
      productId,
      userId,
    };

    const checkOrder = await this.orderDataBase.getOrderByProductId(
      inputOrderId
    );

    if (checkOrder) {
      let qtyProduct = checkOrder.product_qty;
      const incremento = qtyProduct + quantity;

      const validation = checkOrder.product_qty + incremento;

      if (validation > checkStock.qty_stock) {
        throw new CustomError(
          409,
          'Quantidade desejada acima da existente em estoque'
        );
      }

      const inputAlterOrder: IAlterOrderQtyIntputDTO = {
        incremento,
        productId,
        userId,
      };

      await this.orderDataBase.alterOrderQty(inputAlterOrder);
      const response = 'Alterado com sucesso!';

      return response;
    } else {
      const id: string = this.idGenerator.generate();
      const order = new Order(id, productId, userId, quantity);
      await this.orderDataBase.addOrder(order);

      const response = 'Adicionado ao carrinho';
      return response;
    }
  };

  public getOrders = async (
    input: IGetOrderInputDTO
  ): Promise<IOrdersOutputDB[]> => {
    const token = input.token;
    if (!token) {
      throw new CustomError(401, 'Token inválido');
    }

    const userId: string = this.authenticator.getTokenPayload(token).id;

    const inputSelectOrders: ISelectOrdersInputDTO = {
      userId,
    };

    const response = await this.orderDataBase.selectOrders(inputSelectOrders);

    return response;
  };

  public deleteOrder = async (input: IDeleteOrderInputDTO): Promise<string> => {
    const token = input.token;
    const orderId = input.orderId;
    if (!token) {
      throw new CustomError(401, 'Token inválido');
    }

    if (!orderId) {
      throw new CustomError(400, 'Informe o id do pedido');
    }

    const inputDeleteOrder: IDeleteInputDTO = {
      orderId,
    };

    const checkOrder = await this.orderDataBase.getOrderById(inputDeleteOrder);

    if (!checkOrder) {
      throw new CustomError(404, 'Pedido não encontrado');
    }

    await this.orderDataBase.deleteOrder(inputDeleteOrder);

    const response = 'Pedido de compra deletado';

    return response;
  };
}
