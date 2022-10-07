import jwt from 'jsonwebtoken';
import { USER_ROLE } from '../models/User';

export interface ITokenPayload {
  id: string;
  role: USER_ROLE;
}

export class Authenticator {
  public generate = (payload: ITokenPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  };

  public getTokenPayload = (token: string): ITokenPayload => {
    const payload = jwt.verify(token, process.env.JWT_KEY as string);
    return payload as ITokenPayload;
  };
}
