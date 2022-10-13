"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./router/UserRouter");
const ProductRouter_1 = require("./router/ProductRouter");
const OrderRouter_1 = require("./router/OrderRouter");
const DeliveryRouter_1 = require("./router/DeliveryRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
app.use('/user', UserRouter_1.userRouter);
app.use('/product', ProductRouter_1.productRouter);
app.use('/order', OrderRouter_1.orderRouter);
app.use('/delivery', DeliveryRouter_1.deliveryRouter);
//# sourceMappingURL=index.js.map