import { UrlRepository } from '../../../src/url/storage/url.repository';
import { UrlEntity } from '../../../src/url/storage/url.entity';
import { DataSource } from 'typeorm';
import { TestDatabase } from '../../shared/database-test-utils';

describe('UrlRepository (Integration)', () => {
  let repository: UrlRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    await TestDatabase.start();
    dataSource = TestDatabase.getDataSource();
    repository = new UrlRepository(dataSource);
  });

  afterAll(async () => {
    await TestDatabase.stop();
  });

  it('should insert and retrieve a URL', async () => {
    const url = await repository.createUrl('https://example.com', 'abc123');
    const foundUrl = await repository.findBySlug('abc123');

    expect(foundUrl).toBeDefined();
    expect(foundUrl?.originalUrl).toEqual('https://example.com');
  });
});
