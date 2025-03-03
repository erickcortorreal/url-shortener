import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './storage/url.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  async shortenUrl(
    originalUrl: string,
    customSlug?: string,
  ): Promise<UrlEntity> {
    const slug = customSlug || nanoid(6);
    const existing = await this.urlRepository.findOne({ where: { slug } });
    if (existing) throw new Error('Slug already taken');

    const url = this.urlRepository.create({ slug, originalUrl });
    return await this.urlRepository.save(url);
  }

  async getUrlBySlug(slug: string): Promise<UrlEntity | null> {
    return await this.urlRepository.findOne({ where: { slug } });
  }
}
