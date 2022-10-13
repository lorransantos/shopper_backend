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
exports.ProductDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class ProductDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS);
        });
        this.getProductById = (input) => __awaiter(this, void 0, void 0, function* () {
            const productId = input.productId;
            const [response] = yield BaseDataBase_1.BaseDatabase.connection(ProductDataBase.TABLE_PRODUCTS).where({ id: productId });
            return response;
        });
    }
}
exports.ProductDataBase = ProductDataBase;
ProductDataBase.TABLE_PRODUCTS = 'products';
//# sourceMappingURL=ProductDataBase.js.map