const expect = require('expect');
const request = require('supertest');

const app = require('../../app');

describe('root of API', () =>{
    it('welcomes visitors', async()=>{
        const res = await request(app)
            .get('/')
            .expect(200);
        expect(res.text).toEqual("oh hai");
        expect(res.body).toEqual({});

    });
});