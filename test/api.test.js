const userController = require('../controller/user.controller');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
var bcrypt = require("bcryptjs");

beforeAll(async () => {    
    try {
        await mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("Successfully connect to MongoDB.");
            })
            .catch(err => {
                console.error("Connection error", err);
                process.exit();
            }); 
    } catch (error) {
        console.log('error in connection while testing', error)
    }
});

afterAll(async () =>{
    try {
       await mongoose.connection.close();
    } catch (error) {
        console.log('Error while closing', error);
    }
});

const res = {
    status: jest.fn((x)=> x),           //mocking a function
    send: jest.fn((x) => x)
}

    test('Add Users', async() => {
        const req = {
            body: {
                username: 'Test',
                email: 'test@email.com',
                password: bcrypt.hashSync('1232232232', 8)
            }
        }
        await userController.addUser(req, res);
        expect(res.status).toHaveBeenCalledTimes(1);
       ;
    },500000);

    test('Get Users', async() => {
        const req = {
            params: {
                id: '641bf09e943d860747dbae3c'
            },
        }
        await userController.getUserByID(req, res);
        expect(res.status).toHaveBeenCalledTimes(2);
       ;
    },500000);

    test('Update User', async() => {
        const req = {
            params: {
                id: '641bf09e943d860747dbae3c'
            },
            body:{
                email:'hi@gmail.com'
            }
        }
        await userController.updateUserById(req, res);
        expect(res.status).toHaveBeenCalledTimes(3);
    },500000);