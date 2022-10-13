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
exports.OrderController = void 0;
class OrderController {
    constructor(orderBusiness) {
        this.orderBusiness = orderBusiness;
        this.addOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const productId = req.body.productId;
                const quantity = req.body.quantity;
                const input = {
                    token,
                    productId,
                    quantity,
                };
                const response = yield this.orderBusiness.addOrder(input);
                res.status(201).send(response);
            }
            catch (error) {
                res
                    .status(error.code)
                    .send(error.sqlMessage || { message: error.message });
            }
        });
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const input = {
                    token,
                };
                const response = yield this.orderBusiness.getOrders(input);
                res.status(200).send(response);
            }
            catch (error) {
                res
                    .status(error.code)
                    .send(error.sqlMessage || { message: error.message });
            }
        });
        this.deleteOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const orderId = req.body.orderId;
                const input = {
                    token,
                    orderId,
                };
                const response = yield this.orderBusiness.deleteOrder(input);
                res.status(200).send(response);
            }
            catch (error) {
                res
                    .status(error.code)
                    .send(error.sqlMessage || { message: error.message });
            }
        });
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map