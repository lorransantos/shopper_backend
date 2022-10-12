import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { ILoginInput, ISignupInput } from '../models/User';

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const input: ISignupInput = {
        name,
        email,
        password,
      };

      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const input: ILoginInput = {
        email,
        password,
      };

      const response = await this.userBusiness.login(input);

      res.status(201).send(response);
    } catch (error) {
      res
        .status(error.code)
        .send(error.sqlMessage || { message: error.message });
    }
  };
}
