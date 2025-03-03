import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {DataSource} from 'typeorm';

export class TestDatabase {
  private static instance: TestDatabase;
  private static container: StartedPostgreSqlContainer;
  private dataSource: DataSource;

  private constructor() {
  }

  public static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase();
    }
    return TestDatabase.instance;
  }

  async start() {
    if (!TestDatabase.container) {
      TestDatabase.container = await new PostgreSqlContainer()
        .withDatabase('testdb')
        .withUsername('testuser')
        .withPassword('testpass')
        .start();
    }

    if (!this.dataSource) {

      this.dataSource = new DataSource({
        type: 'postgres',
        host: TestDatabase.container.getHost(),
        port: TestDatabase.container.getPort(),
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
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
