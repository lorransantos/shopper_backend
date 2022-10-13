export class Delivery {
  constructor(
    private id: string,
    private receiveUserName: string,
    private deliveryDate: string
  ) {}

  public getId = () => {
    return this.id;
  };

  public getReceiveUserName = () => {
    return this.receiveUserName;
  };

  public getDeliveryDate = () => {
    return this.deliveryDate;
  };
}

export interface IDeliveryInputDTO {
  token: string;
  receiveUserName: string;
  deliveryDate: string;
}

export interface IDeliveryInputDB {
  id: string;
  receiveUserName: string;
  deliveryDate: string;
  userId: string;
}

export interface IGetDeliveryOrdersDTO {
  userId: string;
}

export interface IGetDeliveryOrdersOutputDB {
  id: string;
  user_id: string;
  receive_user_name: string;
  delivery_date: string;
}
