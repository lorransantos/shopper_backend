export class Order {
  constructor(
    private id: string,
    private productId: string,
    private userId: string,
    private quantity: number
  ) {}

  public getId = () => {
    return this.id;
  };

  public getProductId = () => {
    return this.productId;
  };

  public getUserId = () => {
    return this.userId;
  };

  public getQuantity = () => {
    return this.quantity;
  };
}

export interface IAddOrderInputDTO {
  token: string;
  productId: string;
  quantity: number;
}

export interface IAddOrderInputDB {
  id: string;
  productId: string;
  userId: string;
}

export interface IGetOrderInputDTO {
  token: string;
}

export interface IDeleteOrderInputDTO {
  token: string;
  orderId: string;
}

export interface IOrdersOutputDB {
  id: string;
  product_id: string;
  name: string;
  price: number;
  product_qty: number;
}

export interface IGetOrderByIdOutputDB {
  id: string;
  user_id: string;
  product_id: number;
  product_qty: number;
}

export interface IGetQtyStockInputDTO {
  productId: string;
}

export interface IGetQtyStockOutputDB {
  qty_stock: number;
}

export interface IAlterOrderQtyIntputDTO {
  incremento: number;
  productId: string;
  userId: string;
}

export interface ISelectOrdersInputDTO {
  userId: string;
}

export interface IDeleteInputDTO {
  orderId: string
}

export interface IGetOrderByProductIdInputDTO {
  productId: string;
  userId: string;
}

export interface IGetOrderByProductIdOutputDB {
  id: string;
  user_id: string;
  product_id: number;
  product_qty: number;
}
