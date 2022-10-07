import { v4 } from 'uuid';

export class IdGenerator {
  public generate = (): string => {
    const id: string = v4();
    return id;
  };
}
