import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllUser } from "../Services/DB/UserService";
import { user1JSON, errorUser1JSON, errorUser2JSON, user2JSON } from "./Model/User";
import { application1JSON, errorApplication1JSON, errorApplication2JSON, errorApplication3JSON, errorApplication4JSON } from "./Model/Application";
import * as express from "express";
jest.mock("../Configuration", () => ({
    MONGO_URL: "mongodb://localhost:27017/db_test",
    DATABASENAME: "db_test",
    EMAIL_DETAILS: {
        host: "smtp.gmail.com",
        port: 465,
        service: 'Gmail',
        secure: false,// true for 465, false for other ports
        auth: {
            user: 'noreply.me.tdk@gmail.com',
            pass: 'MEtdk2020'
        },
        tls: { rejectUnauthorized: false }
    },
    SENDER_EMAIL: 'noreply.me.tdk@gmail.com'
}));


jest.mock('../Routes/checkIsAuthenticated', () => ({
    checkIsAuthenticated: jest.fn(() => (req: express.Request, res, next) => {
        next();
    }),
}));
//var server, agent;
describe('User Tests', function () {
    let server, agent;
    beforeAll((done) => {
        console.log("BeforeAll");
        server = app.listen(3000, (err) => {
            if (err) return done(err);
            agent = request.agent(server);
            done();
        });
    });
    describe('User Test', function () {
        beforeEach(async () => {
            await deleteAllUser();
            await
                agent
                    .post('/api/createDB')
                    .expect(200)


            await
                agent
                    .post('/api/allCollection')
                    .expect(200);
        });
        it('errorUser1JSON POST /api/users', async function () {

            await
                agent
                    .post('/api/users/hu').send(errorUser1JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 5);
                        equal(response.body[0].locationProperty, 'user.name');
                        equal(response.body[1].locationProperty, 'user.email');
                        equal(response.body[2].locationProperty, 'user.password');
                        equal(response.body[3].locationProperty, 'user.permission');
                        equal(response.body[4].locationProperty, 'user.registrationDate');
                    });

        });
        it('errorUser2JSON POST /api/users', async function () {

            await
                agent
                    .post('/api/users/hu').send(errorUser2JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 4);
                        equal(response.body[0].locationProperty, 'user.name');
                        equal(response.body[1].locationProperty, 'user.password');
                        equal(response.body[2].locationProperty, 'user.permission');
                        equal(response.body[3].locationProperty, 'user.registrationDate');
                    });

        });



    });

    afterAll(async () => {
        await server.close();
    });
});