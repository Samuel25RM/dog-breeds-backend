const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  test('Health check endpoint returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});