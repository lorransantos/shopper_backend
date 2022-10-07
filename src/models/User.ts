export enum USER_ROLE {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLE
  ) {}

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getEmail = () => {
    return this.email;
  };

  public getPassword = () => {
    return this.password;
  };

  public getRole = () => {
    return this.role;
  };
}

export interface ISignupInput {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
