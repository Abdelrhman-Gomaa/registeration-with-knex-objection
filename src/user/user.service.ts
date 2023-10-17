import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserInput } from './input/register.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from './input/login.input';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/exceptions/error-code.enum';
import { TokenPayload } from 'src/auth/auth-token-payload.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) { }

  async createUser(input: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(input.password, 12);

    // await this.knex.table('users').insert({  name: input.name, email: input.email, password: hashPassword });
    // const users = await this.knex.table('users');
    // return { users };

    return await User.query().insert(
      { 
        firstName: input.firstName,
        lastName: input.lastName, 
        email: input.email, 
        password: hashPassword 
      });
  }

  async login(input: LoginInput){
    const user = await User.query().findOne({email: input.email})
    if(!( user.password && (await bcrypt.compare(input.password, user.password))))
    throw new BaseHttpException(ErrorCodeEnum.INCORRECT_PASSWORD);
    const payload: TokenPayload = { userId: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    return{
      user,
      accessToken
    }
  }

  async checkUser() {
    if (!await this.knex.schema.hasTable('users')) {
      await this.knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('phone').nullable();
        table.string('nation').nullable();
        table.enum('role',['USER', 'ADMIN']).nullable();
        table.timestamps(true, true);
      });
    }
  }

}