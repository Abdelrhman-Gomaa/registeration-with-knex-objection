import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreatePostInput } from './input/create-post.input';
import { Post } from './models/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) { }
 
	async createPost(input: CreatePostInput, userId: string){
		return Post.query().insert(
			{ 
				content:input.content,
				userId
			});
		}

		
	async checkPost() {
		if (!await this.knex.schema.hasTable('posts')) {
			await this.knex.schema.createTable('posts', table => {
				table.increments('id').primary();
				table.string('content').notNullable();
				table.string('userId').notNullable();
				table.timestamps(true, true);
			});
		}
	}
}