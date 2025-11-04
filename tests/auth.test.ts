import request from 'supertest';
import app from '../src/app';

describe('Auth Flow', () => {
  const user = {
    name: "TestUser",
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('email');
  });

  it('should login existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(user);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
  });
});
