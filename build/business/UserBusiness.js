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
exports.UserBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userDataBase, idGenerator, hashManager, authenticator) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const email = input.email;
            const password = input.password;
            if (!name || !email || !password) {
                throw new CustomError_1.CustomError(400, 'Favor preencher os campos');
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new CustomError_1.CustomError(400, 'Favor informar um email válido');
            }
            if (password.length < 6) {
                throw new CustomError_1.CustomError(400, 'A senha precisa ter no mínimo 6 caracteres');
            }
            if (typeof email !== 'string') {
                throw new CustomError_1.CustomError(400, 'Tipo do campo "senha" incorreto');
            }
            if (typeof password !== 'string') {
                throw new CustomError_1.CustomError(400, 'Tipo do campo "senha" incorreto');
            }
            if (typeof name !== 'string') {
                throw new CustomError_1.CustomError(400, 'Tipo do campo "name" incorreto');
            }
            const checkEmail = yield this.userDataBase.checkEmail(email);
            if (checkEmail) {
                throw new CustomError_1.CustomError(409, 'Email já cadastrado');
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            const userDB = new User_1.User(id, name, email, hashPassword);
            yield this.userDataBase.createUser(userDB);
            const response = 'Usuário criado com sucesso!';
            return response;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const email = input.email;
            const password = input.password;
            if (!email || !password) {
                throw new CustomError_1.CustomError(400, 'Favor preecher os campos');
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new CustomError_1.CustomError(400, 'Favor informar um email válido');
            }
            if (password.length < 6) {
                throw new CustomError_1.CustomError(400, 'A senha precisa ter no mínimo 6 caracteres');
            }
            if (typeof password !== 'string') {
                throw new CustomError_1.CustomError(400, 'Tipo do campo "senha" incorreto');
            }
            const userDB = yield this.userDataBase.checkEmail(email);
            if (!userDB) {
                throw new CustomError_1.CustomError(404, 'Email não cadastrado');
            }
            const checkPassword = yield this.hashManager.compare(password, userDB.password);
            if (!checkPassword) {
                throw new CustomError_1.CustomError(403, 'Senha incorreta');
            }
            const payload = {
                id: userDB.id,
            };
            const token = this.authenticator.generate(payload);
            const response = {
                message: 'Usuário logado com sucesso!',
                token: token,
            };
            return response;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map