"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
class Delivery {
    constructor(id, receiveUserName, deliveryDate) {
        this.id = id;
        this.receiveUserName = receiveUserName;
        this.deliveryDate = deliveryDate;
        this.getId = () => {
            return this.id;
        };
        this.getReceiveUserName = () => {
            return this.receiveUserName;
        };
        this.getDeliveryDate = () => {
            return this.deliveryDate;
        };
    }
}
exports.Delivery = Delivery;
//# sourceMappingURL=Delivery.js.map