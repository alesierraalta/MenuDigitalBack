import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { Sequelize } from 'sequelize-typescript';

describe('ImagenesCategoriasController (e2e)', () => {
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
      await sequelize.query("DELETE FROM imagenes_categorias WHERE imagen_url LIKE '%Test%'");
      await sequelize.query("DELETE FROM categorias WHERE nombre_categoria LIKE '%Test%'");
    }

    if (app) {
      await app.close();
    }
  });

  it('/api/categorias/:id/imagenes (POST)', async () => {
    // Crea una categoría para asociarle una imagen
    const categoriaRes = await request(app.getHttpServer())
      .post('/api/categorias')
      .send({ nombre_categoria: 'Test Categoria con Imagen' })
      .expect(201);

    const categoriaId = categoriaRes.body.id_categoria;

    // Ahora crea una imagen asociada a esa categoría
    return request(app.getHttpServer())
      .post(`/api/categorias/${categoriaId}/imagenes`)
      .send({ imagen_url: 'https://example.com/test.jpg' })
      .expect(201)
      .expect((res) => {
        expect(res.body.imagen_url).toEqual('https://example.com/test.jpg');
        expect(res.body.id_categoria).toEqual(categoriaId);
      });
  });
});
