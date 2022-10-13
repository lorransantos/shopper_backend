import { IUserDB, User } from '../models/User';
import { BaseDatabase } from './BaseDataBase';

export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = 'users';

  public checkEmail = async (email: string): Promise<IUserDB> => {
    const [response] = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where({ email });
    return response;
  };

  public createUser = async (user: User) => {
    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword()
    });
  };
}
