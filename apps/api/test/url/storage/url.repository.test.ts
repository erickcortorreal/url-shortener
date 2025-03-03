import { UrlRepository } from '../../../src/url/storage/url.repository';
import { TestDatabase } from '../../shared/database-test-utils';

describe('UrlRepository (Integration)', () => {
  let repository: UrlRepository;

  beforeAll(async () => {
    await TestDatabase.getInstance().start()
    repository = new UrlRepository(TestDatabase.getInstance().getDataSource());
  });

  it('should insert and retrieve a URL', async () => {
    const url = await repository.createUrl('https://example.com', 'abc123');
    const foundUrl = await repository.findBySlug('abc123');

    expect(foundUrl).toBeDefined();
    expect(foundUrl?.originalUrl).toEqual('https://example.com');
  });
});
