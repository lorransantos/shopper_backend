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
exports.DeliveryBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
class DeliveryBusiness {
    constructor(orderDataBase, deliveryDataBase, productDataBase, idGenerator, authenticator) {
        this.orderDataBase = orderDataBase;
        this.deliveryDataBase = deliveryDataBase;
        this.productDataBase = productDataBase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.deliveryOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input.token;
            const receiveUserName = input.receiveUserName;
            const deliveryDate = input.deliveryDate;
            if (!token) {
                throw new CustomError_1.CustomError(400, 'Token inexistente');
            }
            if (typeof token !== 'string') {
                throw new CustomError_1.CustomError(400, 'Token incorreto');
            }
            if (!receiveUserName) {
                throw new CustomError_1.CustomError(400, 'Favor informar o nome do responsável por receber seus pedidos');
            }
            if (typeof receiveUserName !== 'string') {
                throw new CustomError_1.CustomError(400, 'Tipo do campo inválido');
            }
            if (!deliveryDate || typeof deliveryDate !== 'string') {
                throw new CustomError_1.CustomError(400, 'Informe a data que deseja receber as compras');
            }
            const userId = this.authenticator.getTokenPayload(token).id;
            const inputSelectOrders = {
                userId,
            };
            const purchaseList = yield this.orderDataBase.selectOrders(inputSelectOrders);
            for (const order of purchaseList) {
                let inputGetProductById = {
                    productId: order.product_id,
                };
                const product = yield this.productDataBase.getProductById(inputGetProductById);
                const newStock = product.qty_stock - order.product_qty;
                yield this.deliveryDataBase.updateStock(order.product_id, newStock);
            }
            const id = this.idGenerator.generate();
            const inputDB = {
                id,
                receiveUserName,
                deliveryDate,
                userId,
            };
            const orderDelivery = yield this.deliveryDataBase.finalizationOrder(inputDB);
            return {
                deliveryInfo: orderDelivery,
                orders: purchaseList,
            };
        });
        this.getDeliveryOrders = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input;
            if (!token || typeof token !== 'string') {
                throw new Error('Token inexistente ou incorreto');
            }
            const userId = this.authenticator.getTokenPayload(token).id;
            const inputGetDeliveryOrders = {
                userId,
            };
            const deliveryOrders = yield this.deliveryDataBase.getDeliveryOrders(inputGetDeliveryOrders);
            return deliveryOrders;
        });
    }
}
exports.DeliveryBusiness = DeliveryBusiness;
//# sourceMappingURL=DeliveryBusiness.js.map