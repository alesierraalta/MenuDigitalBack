import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { createConnection, getConnection } from 'typeorm';

describe('CategoriasController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await createConnection({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);  // Aumentar tiempo de espera a 10000 ms (10 segundos)

  afterAll(async () => {
    if (app) await app.close();
    if (getConnection().isConnected) await getConnection().close();
  });

  it('/api/categorias (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/categorias')
      .send({ nombre_categoria: 'Test Categoria' })
      .expect(201)
      .expect((res) => {
        expect(res.body.nombre_categoria).toEqual('Test Categoria');
      });
  });
});
