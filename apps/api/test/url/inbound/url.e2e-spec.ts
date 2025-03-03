import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, HttpStatus} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../../src/app.module';
import {TestDatabase} from "../../shared/database-test-utils";
import {DataSource} from "typeorm";

describe('UrlController (e2e) with Testcontainers', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await TestDatabase.getInstance().start()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(DataSource).useValue(TestDatabase.getInstance().getDataSource()).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /url/shorten should create a short URL', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/url/shorten')
      .send({url: 'https://example.com'})
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('slug');
    expect(response.body.originalUrl).toBe('https://example.com');
  });

  it('POST /url/shorten should return 400 if URL is missing', async () => {
    await request(app.getHttpServer())
      .post('/api/url/shorten')
      .send({})
      .expect(HttpStatus.BAD_REQUEST)
      .expect({statusCode: 400, message: 'URL is required'});
  });

  it('GET /url/:slug should redirect to the original URL', async () => {
    // First, shorten a URL
    const shortenResponse = await request(app.getHttpServer())
      .post('/api/url/shorten')
      .send({url: 'https://example.com'})
      .expect(HttpStatus.CREATED);

    const slug = shortenResponse.body.slug;

    // Now test redirection
    const redirectResponse = await request(app.getHttpServer())
      .get(`/api/url/${slug}`)
      .expect(HttpStatus.FOUND);

    expect(redirectResponse.headers.location).toBe('https://example.com');
  });

  it('GET /url/:slug should return 404 for non-existent slug', async () => {
    await request(app.getHttpServer())
      .get('/api/url/nonexistent')
      .expect(HttpStatus.NOT_FOUND)
      .expect({statusCode: 404, message: 'Not Found'});
  });
});
