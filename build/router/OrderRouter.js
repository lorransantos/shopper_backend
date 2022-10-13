"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const OrderBusiness_1 = require("../business/OrderBusiness");
const OrderController_1 = require("../controller/OrderController");
const OrderDataBase_1 = require("../database/OrderDataBase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
exports.orderRouter = (0, express_1.Router)();
const orderController = new OrderController_1.OrderController(new OrderBusiness_1.OrderBusiness(new OrderDataBase_1.OrderDataBase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator()));
exports.orderRouter.post('/add-order', orderController.addOrder);
exports.orderRouter.get('/', orderController.getOrders);
exports.orderRouter.put('/delete-order', orderController.deleteOrders);
//# sourceMappingURL=OrderRouter.js.map