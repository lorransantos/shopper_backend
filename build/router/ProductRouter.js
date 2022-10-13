"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductBusiness_1 = require("../business/ProductBusiness");
const ProductController_1 = require("../controller/ProductController");
const ProductDataBase_1 = require("../database/ProductDataBase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
exports.productRouter = (0, express_1.Router)();
const productController = new ProductController_1.ProductController(new ProductBusiness_1.ProductBusiness(new ProductDataBase_1.ProductDataBase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator()));
exports.productRouter.get('/', productController.getProducts);
//# sourceMappingURL=ProductRouter.js.map