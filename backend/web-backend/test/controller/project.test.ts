import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('ProjectController', () => {
  let app;
  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });   

  it('should write a project', async () => {
    const project = {};
    const response = await createHttpRequest(app)
      .post('/project/write')
      .send(project);

    expect(response.status).toBe(200);
    // todo
  });

  it('should read projects', async () => {
    const response = await createHttpRequest(app).get('/project/read');

    expect(response.status).toBe(200);
  });

  it('should delete a project', async () => {
    const projectMessage = { index: 1 };
    const response = await createHttpRequest(app)
      .post('/project/delete')
      .send(projectMessage);

    expect(response.status).toBe(200);
  });

  it('should rename a project', async () => {
    const projectMessage = { index: 1, newName: 'New Project Name' };
    const response = await createHttpRequest(app)
      .post('/project/rename')
      .send(projectMessage);

    expect(response.status).toBe(200);
  });
});
