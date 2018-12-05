const expect = require('expect');
const request = require('supertest');
require('../helper');

const app = require('../../app');

const User = require('../../models/user')

describe('User Authentication', () => {
  it('users can log in and receive a JWT', async () => {
    const userParams = {
      firstName: 'Sobika',
      lastName: 'G',
      email: 'abcdef@gmk.com',
      student: true,
      password: 'password',
    };

    const user = await User.create(userParams);

    // const email = 'abcdef@gmk.com';
    // const password = 'password';

    const res = await request(app)
    .post('/login')
    .send({ email: 'abcdef@gmk.com', password: 'password' })
    .expect(200);
    // console.log("res..............",res);
    expect(res.body.jwt).not.toBe(undefined);
    console.log("res.body.jwt.......",res.body.jwt);
    expect(res.body.user).toEqual({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      student: true,
    });
    expect(res.body.user.passwordDigest).toEqual(undefined);
    expect(res.body.user.createdAt).toEqual(undefined);
    expect(res.body.user.updatedAt).toEqual(undefined);
  });
});