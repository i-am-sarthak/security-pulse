import request from 'supertest';
import app from '../src/app';

describe('Protected Routes', () => {
  it('GET /api/me should reject without token', async () => {
    const res = await request(app).get('/api/me');

    expect(res.status).toBe(401);
  });
});
