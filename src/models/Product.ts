export class Product {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private qtyStock: number
  ) {}

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getPrice = () => {
    return this.price;
  };

  public getQtyStock = () => {
    return this.qtyStock;
  };
}

