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
exports.OrderDataBase = void 0;
const ProductDataBase_1 = require("./ProductDataBase");
const BaseDataBase_1 = require("./BaseDataBase");
class OrderDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getQtyStock = (input) => __awaiter(this, void 0, void 0, function* () {
            const productId = input.productId;
            const [response] = yield BaseDataBase_1.BaseDatabase.connection(ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS)
                .select('qty_stock')
                .where({ id: productId });
            return response;
        });
        this.getOrderByProductId = (input) => __awaiter(this, void 0, void 0, function* () {
            const userId = input.userId;
            const productId = input.productId;
            const [result] = yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
                .where({ user_id: userId })
                .where({ product_id: productId });
            return result;
        });
        this.getOrderById = (input) => __awaiter(this, void 0, void 0, function* () {
            const orderId = input.orderId;
            const [response] = yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER).where({ id: orderId });
            return response;
        });
        this.addOrder = (order) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER).insert({
                id: order.getId(),
                product_id: order.getProductId(),
                user_id: order.getUserId(),
            });
        });
        this.alterOrderQty = (input) => __awaiter(this, void 0, void 0, function* () {
            const incremento = input.incremento;
            const productId = input.productId;
            const userId = input.userId;
            yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
                .update({ product_qty: incremento })
                .where({ product_id: productId })
                .where({ user_id: userId });
        });
        this.selectOrders = (input) => __awaiter(this, void 0, void 0, function* () {
            const id = input.userId;
            const result = yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
                .select(`${OrderDataBase.TABLE_ORDER}.id`, `${OrderDataBase.TABLE_ORDER}.product_id`, `${ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS}.name`, `${ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS}.price`, `${OrderDataBase.TABLE_ORDER}.product_qty`)
                .innerJoin(`${ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS}`, `${ProductDataBase_1.ProductDataBase.TABLE_PRODUCTS}.id`, `${OrderDataBase.TABLE_ORDER}.product_id`)
                .where({ user_id: id });
            return result;
        });
        this.deleteOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const orderId = input.orderId;
            yield BaseDataBase_1.BaseDatabase.connection(OrderDataBase.TABLE_ORDER)
                .delete()
                .where({ id: orderId });
        });
    }
}
exports.OrderDataBase = OrderDataBase;
OrderDataBase.TABLE_ORDER = 'orders_list';
OrderDataBase.TABLE_FINISH_ORDER = 'orders_delivery';
//# sourceMappingURL=OrderDataBase.js.map