"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDataBase = void 0;
const ProductDataBase_1 = require("./ProductDataBase");
const BaseDataBase_1 = require("./BaseDataBase");
class DeliveryDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.finalizationOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const receiveUserName = input.receiveUserName;
            const deliveryDate = input.deliveryDate;
            const id = input.id;
            const userId = input.userId;
            yield BaseDataBase_1.BaseDatabase.connection(DeliveryDataBase.TABLE_FINISH_ORDER).insert({
                id,
                receive_user_name: receiveUserName,
                delivery_date: deliveryDate,
                user_id: userId,
            });
            const response = yield BaseDataBase_1.BaseDatabase.connection(DeliveryDataBase.TABLE_FINISH_ORDER).where({ user_id: userId });
            return response;
        });
        this.getDeliveryOrders = (input) => __awaiter(this, void 0, void 0, function* () {
            const userId = input.userId;
            const response = yield BaseDataBase_1.BaseDatabase.connection(DeliveryDataBase.TABLE_FINISH_ORDER).where({ user_id: userId });
            return response;
        });
        this.updateStock = (productId, qtyPurchase) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS)
                .update({ qty_stock: qtyPurchase })
                .where({ id: productId });
        });
    }
}
exports.DeliveryDataBase = DeliveryDataBase;
DeliveryDataBase.TABLE_FINISH_ORDER = 'orders_delivery';
//# sourceMappingURL=DeliveryDataBase.js.map