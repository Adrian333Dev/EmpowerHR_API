import { Expose } from 'class-transformer';
import { IUserOutput } from './auth-n.interface';

export class SignUpOutput implements IUserOutput {
  @Expose()
  user_id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;
}
