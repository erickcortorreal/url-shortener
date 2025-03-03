import { Injectable } from '@nestjs/common';

import { UrlRepository } from '../storage/url.repository';
import { Url } from '../url.domain';

@Injectable()
export class GetUrlBySlug {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(slug: string): Promise<Url | null> {
    return await this.urlRepository.findBySlug(slug);
  }
}
