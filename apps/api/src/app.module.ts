import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './shared/database.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web', 'dist'),
      exclude: ['/api']
    }),
    DatabaseModule,
    UrlModule,
  ],
})
export class AppModule {}
