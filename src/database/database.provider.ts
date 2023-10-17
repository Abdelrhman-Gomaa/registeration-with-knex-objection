import knex from 'knex';
import { Model } from 'objection';

export const databaseProviders = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const config = knex({
        client: 'pg',
        connection: {
          host: process.env.HOST,
          port: +process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
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