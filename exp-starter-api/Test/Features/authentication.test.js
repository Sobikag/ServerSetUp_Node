const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('../helper');

const app = require('../../app');
const User = require('../../models/user');
const serializedUser = require('../../serializers/users');

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

    const res = await request(app)
    .post('/login')
    .send({ email: 'abcdef@gmk.com', password: 'password' })
    .expect(200);
    // console.log("res..............",res);
    expect(res.body.jwt).not.toBe(undefined);
    // console.log("res.body.jwt.......",res.body.jwt);
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

  it('can be listed for a logged in user', async() =>{
    const user = await User.create({
      firstName: 'Sobika',
      lastName: 'G',
      email: 'abcdef@gmk.com',
      student: true,
      password: 'password',
    });

    const userSerializer = await serializedUser(user);
    const token = jwt.sign({ user: userSerializer }, process.env.JWT_SECRET);

    const resNotLoggedIn = await request(app)
      .get('/users')
      .expect(404);
    expect(resNotLoggedIn.body).toEqual({ message: 'Not Found', error: { message: 'Not Found' } });
    // console.log("token.....",token);
    // const resLoggedIn = await request(app)
    //   .get('/users')
    //   .set('jwt', token)
    //   .expect(200);
      // console.log("user length........",resLoggedIn.body);
    // expect((resLoggedIn.body).users.length).toBe(1);
  })
});