import { Model } from 'objection';
import { Post } from 'src/post/models/post.model';
import { UserRoleEnum } from '../user.enum';

export class User extends Model {
  static get tableName(): string {
    return 'users';
  }

  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phone?: string;
  nation?: string;
  role?: 'USER' | 'ADMIN';

  static get idColumn() {
    return 'id';
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  // static get jsonSchema() {
  //   return {
  //     type: 'object',
  //     required: ['firstName', 'lastName', 'email', 'password'],

  //     properties: {
  //       id: { type: 'integer' },
  //       firstName: { type: 'string', minLength: 1, maxLength: 255 },
  //       lastName: { type: 'string', minLength: 1, maxLength: 255 },
  //       email: { type: 'string', minLength: 1,maxLength: 255 },
  //       password: { type: 'string', minLength: 1, maxLength: 255 },
  //       phone: { type: 'string', minLength: 1, maxLength: 255 },
  //       nation: { type: 'string', minLength: 1, maxLength: 255 },
  //       role: { type: 'enum', minLength: 1, maxLength: 255 },
  //     }
  //   };
  // }

  static get relationMappings() {
    return{
      posts: {
				relation: Model.HasManyRelation,
				modelClass: Post,
				join: {
					from: 'users.id',
					to: 'posts.userId'
				}
			}
		}
	}
}