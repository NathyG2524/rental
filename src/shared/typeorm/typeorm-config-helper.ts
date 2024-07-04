import * as dotenv from 'dotenv';
// import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config({ path: '.env' });

export const TypeOrmConfigHelper = {
  DATABASE_HOST: process.env.DATABASE_HOST ?? 'localhost',
  DATABASE_PORT: process.env.DATABASE_PORT ?? '5432',
  DATABASE_NAME: process.env.DATABASE_NAME ?? '251_ceo_dashboard',
  DATABASE_USER: process.env.DATABASE_USER ?? 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? 'P@ssw0rd@P',
};

const entities =
  process.env.NODE_ENV === 'production'
    ? '/**/*.entity.*'
    : 'dist/**/*.entity.{ts,js}';

const migrations =
  process.env.NODE_ENV === 'production'
    ? 'migrations/*.{ts,js}'
    : 'dist/migrations/*.{ts,js}';

export const dataSourceOptions = {
  type: 'postgres',
  host: TypeOrmConfigHelper.DATABASE_HOST,
  port: Number(TypeOrmConfigHelper.DATABASE_PORT),
  database: TypeOrmConfigHelper.DATABASE_NAME,
  username: TypeOrmConfigHelper.DATABASE_USER,
  password: TypeOrmConfigHelper.DATABASE_PASSWORD,
  entities: [entities],
  migrations: [migrations],
  migrationsRun: true,
  seeds: [`dist/modules/seeders/**.seeder.{ts,js}`],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
  logging: 'all',
  synchronize: false,
  autoLoadEntities: true,
} as DataSourceOptions;
// } as DataSourceOptions & SeederOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
