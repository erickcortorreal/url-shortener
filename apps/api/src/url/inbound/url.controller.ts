import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ShortenUrl } from '../commands/shorten-url';
import { GetUrlBySlug } from '../queries/get-url-by-slug';

@Controller('/api/url')
@ApiTags('url')
export class UrlController {
  constructor(
    private readonly shortenUrlCommand: ShortenUrl,
    private readonly getUrlBySlug: GetUrlBySlug,
  ) {}

  @Post('shorten')
  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiResponse({ status: 201, description: 'URL shortened successfully' })
  @ApiResponse({ status: 400, description: 'Invalid URL provided' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['url'],
      properties: {
        url: { type: 'string', example: 'https://example.com' },
        slug: { type: 'string', example: 'custom123', nullable: true },
      },
    },
  })
  async shortenUrl(@Body('url') url: string, @Body('slug') slug?: string) {
    if (!url) {
      throw new HttpException('URL is required', HttpStatus.BAD_REQUEST);
    }
    return this.shortenUrlCommand.execute(url, slug);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirecting to original URL' })
  @ApiResponse({ status: 404, description: 'Slug not found' })
  @ApiParam({ name: 'slug', type: 'string', example: 'abc123' })
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const urlEntry = await this.getUrlBySlug.execute(slug);
    if (!urlEntry) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return res.redirect(urlEntry.originalUrl);
  }
}
