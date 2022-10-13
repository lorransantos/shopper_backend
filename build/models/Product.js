"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, price, qtyStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qtyStock = qtyStock;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getPrice = () => {
            return this.price;
        };
        this.getQtyStock = () => {
            return this.qtyStock;
        };
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map