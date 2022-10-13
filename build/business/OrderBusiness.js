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
exports.OrderBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const Order_1 = require("../models/Order");
class OrderBusiness {
    constructor(orderDataBase, idGenerator, authenticator) {
        this.orderDataBase = orderDataBase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.addOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input.token;
            const productId = input.productId;
            let quantity = input.quantity;
            if (!token) {
                throw new CustomError_1.CustomError(401, 'Token inválido');
            }
            if (!productId) {
                throw new CustomError_1.CustomError(404, 'Produto não encontrado');
            }
            if (!quantity) {
                quantity = +1;
            }
            const userId = this.authenticator.getTokenPayload(token).id;
            const inputGetQtyStock = {
                productId,
            };
            const checkStock = yield this.orderDataBase.getQtyStock(inputGetQtyStock);
            if (checkStock.qty_stock < quantity) {
                throw new CustomError_1.CustomError(409, 'Quantidade desejada acima da existente em estoque');
            }
            const inputOrderId = {
                productId,
                userId,
            };
            const checkOrder = yield this.orderDataBase.getOrderByProductId(inputOrderId);
            if (checkOrder) {
                let qtyProduct = checkOrder.product_qty;
                const incremento = qtyProduct + quantity;
                const validation = checkOrder.product_qty + incremento;
                if (validation > checkStock.qty_stock) {
                    throw new CustomError_1.CustomError(409, 'Quantidade desejada acima da existente em estoque');
                }
                const inputAlterOrder = {
                    incremento,
                    productId,
                    userId,
                };
                yield this.orderDataBase.alterOrderQty(inputAlterOrder);
                const response = 'Alterado com sucesso!';
                return response;
            }
            else {
                const id = this.idGenerator.generate();
                const order = new Order_1.Order(id, productId, userId, quantity);
                yield this.orderDataBase.addOrder(order);
                const response = 'Adicionado ao carrinho';
                return response;
            }
        });
        this.getOrders = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input.token;
            if (!token) {
                throw new CustomError_1.CustomError(401, 'Token inválido');
            }
            const userId = this.authenticator.getTokenPayload(token).id;
            const inputSelectOrders = {
                userId,
            };
            const response = yield this.orderDataBase.selectOrders(inputSelectOrders);
            return response;
        });
        this.deleteOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input.token;
            const orderId = input.orderId;
            if (!token) {
                throw new CustomError_1.CustomError(401, 'Token inválido');
            }
            if (!orderId) {
                throw new CustomError_1.CustomError(400, 'Informe o id do pedido');
            }
            const inputDeleteOrder = {
                orderId,
            };
            const checkOrder = yield this.orderDataBase.getOrderById(inputDeleteOrder);
            if (!checkOrder) {
                throw new CustomError_1.CustomError(404, 'Pedido não encontrado');
            }
            yield this.orderDataBase.deleteOrder(inputDeleteOrder);
            const response = 'Pedido de compra deletado';
            return response;
        });
    }
}
exports.OrderBusiness = OrderBusiness;
//# sourceMappingURL=OrderBusiness.js.map