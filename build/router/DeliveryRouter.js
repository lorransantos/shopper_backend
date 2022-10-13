"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRouter = void 0;
const ProductDataBase_1 = require("./../database/ProductDataBase");
const express_1 = require("express");
const DeliveryBusiness_1 = require("../business/DeliveryBusiness");
const DeliveryController_1 = require("../controller/DeliveryController");
const DeliveryDataBase_1 = require("../database/DeliveryDataBase");
const OrderDataBase_1 = require("../database/OrderDataBase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
exports.deliveryRouter = (0, express_1.Router)();
const deliveryController = new DeliveryController_1.DeliveryController(new DeliveryBusiness_1.DeliveryBusiness(new OrderDataBase_1.OrderDataBase(), new DeliveryDataBase_1.DeliveryDataBase(), new ProductDataBase_1.ProductDataBase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator()));
exports.deliveryRouter.post('/add-delivery', deliveryController.deliveryOrder);
exports.deliveryRouter.get('/', deliveryController.getDeliveryOrders);
//# sourceMappingURL=DeliveryRouter.js.map