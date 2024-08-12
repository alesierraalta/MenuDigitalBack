import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { Sequelize } from 'sequelize-typescript';

describe('VideosComidasController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    sequelize = app.get<Sequelize>(Sequelize);
  }, 10000);  // Aumentar tiempo de espera a 10000 ms (10 segundos)

  afterAll(async () => {
    if (sequelize) {
      // Elimina los datos creados durante los tests
      await sequelize.query("DELETE FROM videos_comidas WHERE video_url LIKE '%Test%'");
      await sequelize.query("DELETE FROM comidas WHERE nombre_comida LIKE '%Test%'");
    }

    if (app) {
      await app.close();
    }
  });

  it('/api/comidas/:id/videos (POST)', async () => {
    // Crea una comida para asociarle un video
    const comidaRes = await request(app.getHttpServer())
      .post('/api/comidas')
      .send({
        nombre_comida: 'Test Comida con Video',
        descripcion_comida: 'Test Descripcion',
        precio_comida: 10.00,
        id_categoria: 1, // Asegúrate de que esta categoría exista en la base de datos
      })
      .expect(201);

    const comidaId = comidaRes.body.id_comida;

    // Ahora crea un video asociado a esa comida
    return request(app.getHttpServer())
      .post(`/api/comidas/${comidaId}/videos`)
      .send({ video_url: 'https://example.com/test.mp4' })
      .expect(201)
      .expect((res) => {
        expect(res.body.video_url).toEqual('https://example.com/test.mp4');
        expect(res.body.id_comida).toEqual(comidaId);
      });
  });
});
