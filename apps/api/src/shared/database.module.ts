import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UrlEntity } from '../url/storage/url.entity';
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      username: process.env.DB_USER || 'testuser',
      password: process.env.DB_PASS || 'testpass',
      database: process.env.DB_NAME || 'testdb',
      entities: [UrlEntity],
      synchronize: false,
      migrations: [process.env.MIGRATIONS_PATH || 'dist/migrations/*.js'],
      migrationsRun: true,
      logging: true
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      await this.dataSource.runMigrations();
    } catch (error) {
      process.exit(1);
    }
  }
}
