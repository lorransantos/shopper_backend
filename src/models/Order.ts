export class Order {
  constructor(
    private id: string,
    private productId: string,
    private userId: string
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
}

export interface IAddOrderInputDTO {
  token: string;
  productId: string;
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
  productId: string;
}
