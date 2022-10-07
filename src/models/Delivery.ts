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
