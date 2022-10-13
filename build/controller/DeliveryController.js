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
exports.DeliveryController = void 0;
class DeliveryController {
    constructor(deliveryBusiness) {
        this.deliveryBusiness = deliveryBusiness;
        this.deliveryOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { receiveUserName, deliveryDate } = req.body;
                const input = {
                    token,
                    receiveUserName,
                    deliveryDate,
                };
                const response = yield this.deliveryBusiness.deliveryOrder(input);
                res.status(201).send(response);
            }
            catch (error) {
                res
                    .status(error.code)
                    .send(error.sqlMessage || { message: error.message });
            }
        });
        this.getDeliveryOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.deliveryBusiness.getDeliveryOrders(token);
                res.status(201).send(response);
            }
            catch (error) {
                res
                    .status(error.code)
                    .send(error.sqlMessage || { message: error.message });
            }
        });
    }
}
exports.DeliveryController = DeliveryController;
//# sourceMappingURL=DeliveryController.js.map