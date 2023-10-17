import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserInput } from './input/register.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) { }

  async createUser(input: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(input.password, 12);

    // await this.knex.table('users').insert({  name: input.name, email: input.email, password: hashPassword });
    // const users = await this.knex.table('users');
    // return { users };

    return User.query().insert({ name: input.name, email: input.email, password: hashPassword });
  }

  async checkUser() {
    if (!await this.knex.schema.hasTable('users')) {
      await this.knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
      });
    }
  }

}