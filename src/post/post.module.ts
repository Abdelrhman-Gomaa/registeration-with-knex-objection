import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule { }
