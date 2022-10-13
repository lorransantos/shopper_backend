"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, productId, userId, quantity) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.getId = () => {
            return this.id;
        };
        this.getProductId = () => {
            return this.productId;
        };
        this.getUserId = () => {
            return this.userId;
        };
        this.getQuantity = () => {
            return this.quantity;
        };
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map