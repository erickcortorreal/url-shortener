import { Injectable, BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UrlRepository } from '../storage/url.repository';
import { Url } from '../url.domain';

@Injectable()
export class ShortenUrl {
  constructor(private readonly urlRepository: UrlRepository) {}

  /**
   * Shorten a URL with an optional custom slug.
   * @param originalUrl The original URL to shorten.
   * @param customSlug Optional custom slug provided by the user.
   */
  async execute(originalUrl: string, customSlug?: string): Promise<Url> {
    if (!this.isValidUrl(originalUrl)) {
      throw new BadRequestException('Invalid URL provided');
    }

    const slug = customSlug
      ? await this.getSlugOrThrow(customSlug)
      : await this.getUniqueSlug();
    return this.urlRepository.createUrl(originalUrl, slug);
  }

  /**
   * Validate if a given string is a well-formed URL.
   * @param url The string to validate.
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if the custom slug is available, otherwise throw an error.
   * @param slug The custom slug to validate.
   */
  private async getSlugOrThrow(slug: string): Promise<string> {
    const existing = await this.urlRepository.findBySlug(slug);
    if (existing) {
      throw new BadRequestException(`The slug "${slug}" is already in use.`);
    }
    return slug;
  }

  /**
   * Generate a unique slug using nanoid.
   */
  private async getUniqueSlug(): Promise<string> {
    let slug: string;
    let existing: Url | null;

    do {
      slug = nanoid(6);
      existing = await this.urlRepository.findBySlug(slug);
    } while (existing);

    return slug;
  }
}
