import request from 'supertest';
import app from '../src/app';

describe('Articles API', () => {
  it('GET /api/articles should return 200 and an array', async () => {
    const res = await request(app).get('/api/articles');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.data)).toBe(true);
  });
});
