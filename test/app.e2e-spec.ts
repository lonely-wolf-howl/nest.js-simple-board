import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('AppController', () => {
    it('/query?name=Jay (GET)', () => {
      return request(app.getHttpServer())
        .get('/query?name=Jay')
        .expect(200)
        .expect('Hello, Jay!');
    });
  });

  describe('BoardController', () => {
    it('전체 게시글 조회 (GET)', () => {
      return request(app.getHttpServer()).get('/board').expect(200);
    });
  });
});
