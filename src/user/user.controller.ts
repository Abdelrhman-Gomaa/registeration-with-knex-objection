import { Response } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserInput } from './input/register.input';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

 @Post('/register')
  async register(@Body() input: CreateUserInput, @Res() res: Response): Promise<Response> {
    await this.userService.checkUser();
    try {
      const user = await this.userService.createUser(input);
      return res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
  }

}