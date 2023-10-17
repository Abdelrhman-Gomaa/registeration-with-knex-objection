import { Model } from 'objection';
import { User } from 'src/user/models/user.model';

export class Post extends Model {
  static get tableName(): string {
    return 'posts';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'userId'],
      properties: {
        id: { type: 'integer' },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        userId: { type: 'integer' },
      }
    };
  } 

  id!: number;
  content!: string;
  userId!: string;

	static get relationMappings() {
    return{
      user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'posts.userId',
					to: 'users.id'
				}
			}
		}
	}
}