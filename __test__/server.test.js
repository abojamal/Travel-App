//need to enable export {app} from server.js file
import { app } from '../src/server/server';

const supertest = require('supertest');
const { response } = require('express');
const request = supertest(app);
it(' test endpoint', async (done) => {
  const response = await request.get('/');

  done();
});
