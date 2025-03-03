import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './storage/url.entity';
import { UrlRepository } from './storage/url.repository';
import { UrlController } from './inbound/url.controller';
import { ShortenUrl } from './commands/shorten-url';
import { GetUrlBySlug } from './queries/get-url-by-slug';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [UrlRepository, ShortenUrl, GetUrlBySlug],
  exports: [UrlRepository],
  controllers: [UrlController],
})
export class UrlModule {}
