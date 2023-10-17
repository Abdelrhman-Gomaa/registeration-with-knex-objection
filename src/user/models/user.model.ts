import { Model } from 'objection';

export class User extends Model {
  static get tableName(): string {
    return 'users';
  }

  id!: number;
  name!: string;
  email!: string;
  password!: string;
}