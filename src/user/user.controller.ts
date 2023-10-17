import { Response } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserInput } from './input/register.input';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LoginInput } from './input/login.input';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

 @Post('/register')
  async register(@Body() input: CreateUserInput, @Res() res: Response): Promise<Response> {
    await this.userService.checkUser();
    try {
      const user = await this.userService.createUser(input);
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  @Post('/login')
  async login(@Body() input: LoginInput, @Res() res: Response): Promise<Response> {
    await this.userService.checkUser();
    try { 
      const user = await this.userService.login(input);
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

}