const expect = require('expect');

const User = require('../../models/User');

describe('test users', () =>{
    it('should create a user', async() =>{
        console.log("hiiiiiiiiiiiiiii");
        const usersBefore = await User.all();
        expect(usersBefore.length).toBe(0);

        await User.create({
            firstName: 'Sobika',
            lastName: 'Gangadharan',
            email: 'abc@gmail.com',
            student: false,
            password: 'password'
        });

        const usersAfter = await User.all();
        expect(usersAfter.length).toBe(1);
    });
});