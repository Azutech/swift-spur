import supertest from 'supertest';

import app from '../server';

describe('Tests server connection', () => {
  it('it expects server to be running', async () => {
    const request = supertest(app);
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.body.message).toBe('Welcome to Swift-Spur \n Lets solve your financial problems')
  });
});