import { Repository, DataSource } from 'typeorm';
import { UrlEntity } from './url.entity';
import { Injectable } from '@nestjs/common';
import { Url } from '../url.domain';

@Injectable()
export class UrlRepository {
  private readonly repository: Repository<UrlEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UrlEntity);
  }

  async findBySlug(slug: string): Promise<Url | null> {
    const entity = await this.repository.findOne({ where: { slug } });
    return entity ? this.toDomain(entity) : null;
  }

  async createUrl(originalUrl: string, slug: string): Promise<Url> {
    const entity = this.repository.create({ originalUrl, slug });
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  private toDomain(entity: UrlEntity): Url {
    return new Url(entity.originalUrl, entity.slug);
  }
}
