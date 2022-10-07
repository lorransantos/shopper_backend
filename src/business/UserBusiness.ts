import { UserDataBase } from '../database/UserDataBase';
import { ILoginInput, ISignupInput, User, USER_ROLE } from '../models/User';
import { Authenticator, ITokenPayload } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export class UserBusiness {
  constructor(
    public userDataBase: UserDataBase,
    public idGenerator: IdGenerator,
    public hashManager: HashManager,
    public authenticator: Authenticator
  ) {}
  public signup = async (input: ISignupInput) => {
    const name = input.name;
    const email = input.email;
    const password = input.password;
    const role = input.role;

    if (!name || !email || !password || !role) {
      throw new Error('Favor preecher os campos');
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new Error('Favor informar um email válido');
    }

    if (password.length < 6) {
      throw new Error('A senha precisa ter no mínimo 6 caracteres');
    }

    if (typeof password !== 'string') {
      throw new Error('Tipo do campo "senha" incorreto');
    }

    if (typeof name !== 'string') {
      throw new Error('Tipo do campo "name" incorreto');
    }

    const id: string = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);

    const userDB = new User(id, name, email, hashPassword, role);

    await this.userDataBase.createUser(userDB);

    const response = 'Usuário criado com sucesso!';

    return response;
  };

  public login = async (input: ILoginInput) => {
    const email = input.email;
    const password = input.password;

    if (!email || !password) {
      throw new Error('Favor preecher os campos');
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new Error('Favor informar um email válido');
    }

    if (password.length < 6) {
      throw new Error('A senha precisa ter no mínimo 6 caracteres');
    }

    if (typeof password !== 'string') {
      throw new Error('Tipo do campo "senha" incorreto');
    }

    const userDB = await this.userDataBase.checkEmail(email);
    if (!userDB) {
      throw new Error('Email não cadastrado');
    }

    const checkPassword = await this.hashManager.compare(
      password,
      userDB.password
    );
    if (!checkPassword) {
      throw new Error('Senha incorreta');
    }

    const payload: ITokenPayload = {
      id: userDB.id,
      role: userDB.role,
    };

    const token: string = this.authenticator.generate(payload);

    const response = {
      message: 'Usuário logado com sucesso!',
      token: token,
    };

    return response;
  };
}
