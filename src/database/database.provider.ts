import knex from 'knex';
import { Model } from 'objection';

export const databaseProviders = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const config = knex({
        client: 'pg',
        connection: {
          host: 'localhost',
          port: 5433,
          user: 'postgres',
          password: 'pass123',
          database: 'knex-objection',
        },
        migrations: {
          directory: './src/database/migrations',
        },
        searchPath: ['knex', 'public'],
      });
      Model.knex(config);
      return config;
    },
  }
];