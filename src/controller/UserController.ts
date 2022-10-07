import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { ILoginInput, ISignupInput } from '../models/User';

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const input: ISignupInput = {
        name,
        email,
        password,
        role,
      };

      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error: any) {
      res.status(400).send(error.sqlMessage || { message: error.message });
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
    } catch (error: any) {
      res.status(400).send(error.sqlMessage || { message: error.message });
    }
  };
}
