import { GetUrlBySlug } from '../../../src/url/queries/get-url-by-slug';
import { UrlRepository } from '../../../src/url/storage/url.repository';
import { Url } from '../../../src/url/url.domain';

describe('GetUrlBySlug', () => {
  let getUrlBySlug: GetUrlBySlug;
  let urlRepository: jest.Mocked<UrlRepository>;

  beforeEach(() => {
    urlRepository = {
      get: jest.fn(),
    } as unknown as jest.Mocked<UrlRepository>;

    getUrlBySlug = new GetUrlBySlug(urlRepository);
  });

  it('should return the correct URL when slug exists', async () => {
    const mockSlug = 'abc123';
    const mockUrl: Url = new Url('https://example.com', mockSlug);

    urlRepository.findBySlug = jest.fn().mockResolvedValue(mockUrl);

    const result = await getUrlBySlug.execute(mockSlug);

    expect(result).toEqual(mockUrl);
    expect(urlRepository.findBySlug).toHaveBeenCalledWith(mockSlug);
  });

  it('should return null when slug does not exist', async () => {
    const mockSlug = 'notfound';

    urlRepository.findBySlug = jest.fn().mockResolvedValue(null);

    const result = await getUrlBySlug.execute(mockSlug);

    expect(result).toBeNull();
    expect(urlRepository.findBySlug).toHaveBeenCalledWith(mockSlug);
  });
});
