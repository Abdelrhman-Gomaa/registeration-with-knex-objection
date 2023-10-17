import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          connection: {
            host: process.env.HOST,
            port: +process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
          useNullAsDefault: true,
        }
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
