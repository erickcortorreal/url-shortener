import { ShortenUrl } from '../../../src/url/commands/shorten-url';
import { UrlRepository } from '../../../src/url/storage/url.repository';
import { Url } from '../../../src/url/url.domain';
import { BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';

jest.mock('nanoid');

describe('ShortenUrl', () => {
  let shortenUrl: ShortenUrl;
  let urlRepository: { findBySlug: jest.Mock; createUrl: jest.Mock };

  beforeEach(() => {
    urlRepository = {
      findBySlug: jest.fn(),
      createUrl: jest.fn(),
    };

    shortenUrl = new ShortenUrl(urlRepository as unknown as UrlRepository);
  });

  it('should shorten a valid URL with a generated slug', async () => {
    const mockSlug = 'abc123';
    (nanoid as jest.Mock).mockReturnValue(mockSlug);

    urlRepository.findBySlug.mockResolvedValue(Promise.resolve(null));
    urlRepository.createUrl.mockResolvedValue(
      Promise.resolve({
        originalUrl: 'https://example.com',
        slug: mockSlug,
      } as Url),
    );

    const result = await shortenUrl.execute('https://example.com');

    expect(result).toEqual({
      originalUrl: 'https://example.com',
      slug: mockSlug,
    });
    expect(urlRepository.createUrl).toHaveBeenCalledWith(
      'https://example.com',
      mockSlug,
    );
  });

  it('should allow a custom slug if it is not already taken', async () => {
    const customSlug = 'custom123';
    urlRepository.findBySlug.mockResolvedValue(Promise.resolve(null));
    urlRepository.createUrl.mockResolvedValue(
      Promise.resolve({
        originalUrl: 'https://example.com',
        slug: customSlug,
      } as Url),
    );

    const result = await shortenUrl.execute('https://example.com', customSlug);

    expect(result).toEqual({
      originalUrl: 'https://example.com',
      slug: customSlug,
    });
    expect(urlRepository.createUrl).toHaveBeenCalledWith(
      'https://example.com',
      customSlug,
    );
  });

  it('should throw an error if the custom slug is already taken', async () => {
    const customSlug = 'taken123';
    urlRepository.findBySlug.mockResolvedValue(
      Promise.resolve({ slug: customSlug } as Url),
    );

    await expect(
      shortenUrl.execute('https://example.com', customSlug),
    ).rejects.toThrow(BadRequestException);
    expect(urlRepository.createUrl).not.toHaveBeenCalled();
  });

  it('should throw an error if an invalid URL is provided', async () => {
    await expect(shortenUrl.execute('invalid-url')).rejects.toThrow(
      BadRequestException,
    );
    expect(urlRepository.createUrl).not.toHaveBeenCalled();
  });
});
