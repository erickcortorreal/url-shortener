export class Url {
  constructor(originalUrl: string, slug: string) {
    this.originalUrl = originalUrl;
    this.slug = slug;
  }
  slug: string;
  originalUrl: string;
}
