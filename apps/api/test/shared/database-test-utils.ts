import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';

export class TestDatabase {
  private static container: StartedPostgreSqlContainer;
  private static dataSource: DataSource;

  static async start() {
    if (!this.container) {
      this.container = await new PostgreSqlContainer()
        .withDatabase('testdb')
        .withUsername('testuser')
        .withPassword('testpass')
        .start();
    }

    this.dataSource = new DataSource({
      type: 'postgres',
      host: this.container.getHost(),
      port: this.container.getPort(),
      username: 'testuser',
      password: 'testpass',
      database: 'testdb',
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    });
    await this.dataSource.initialize();
    await this.dataSource.runMigrations();
  }

  static async stop() {
    if (this.dataSource) await this.dataSource.destroy();
    if (this.container) await this.container.stop();
  }

  static getDataSource(): DataSource {
    return this.dataSource;
  }
}
