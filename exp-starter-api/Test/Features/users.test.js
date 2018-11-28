const expect = require('expect');
const request = require('supertest');
require('../helper');;

const app = require('../../app');
const User = require('../../models/User');

describe('User Tests', () =>{
    it('can sign up and receive jwt' , async() =>{
        const res = await request(app)
        .get('/users')
        .send({
            firstName: 'Sobika',
            lastName: 'Gangadharan',
            email: 'abc@gmail.com',
            student: false,
            password: 'password'
        }).expect(200);
        expect(res.body.jwt).not.toBe(undefined);
        expect(res.body.user.id).not.toBe(undefined);
        expect(res.body.user.firstName).toBe('Sobika');
        expect(res.body.user.lastName).toBe('Gangadharan');
        expect(res.body.user.email).toBe('abc@gmail.com');
        expect(res.body.user.student).toBe(false);

        expect(res.body.user.passwordDigest).toEqual(undefined);
        expect(res.body.user.createdAt).toEqual(undefined);
        expect(res.body.user.updatedAt).toEqual(undefined);

    });

    xit('can be listed without user and with one added', async() =>{
        const resWithoutUser = await request(app)
        .get('/users')
        .expect(200);
        expect(resWithoutUser).toEqual({users : []});

        await User.create({
            firstName: 'Sobika',
            lastName: 'Gangadharan',
            email: 'abc@gmail.com',
            student: false,
            password: 'password',
        });
        const resWithUser = await request(app)
        .get('/')
        .expect(200);
        expect(resWithUser.body.users.length).toEqual(1);
        const newUser = resWithUsers.body.users[0]
        expect(resWithUsers.jwt).toBe(undefined);
        expect(newUser.id).not.toBe(undefined);
        expect(newUser.firstName).toEqual('Elowyn');
        expect(newUser.lastName).toEqual('Platzer Bartel');
        expect(newUser.email).toEqual('elowyn@example.com');
        expect(newUser.student).toEqual(true);

        expect(newUser.passwordDigest).toEqual(undefined);
        expect(newUser.createdAt).toEqual(undefined);
        expect(newUser.updatedAt).toEqual(undefined);
    });

});