import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllUser } from "../Services/DB/UserService";
import { user1JSON, user3JSON, user2JSON } from "./Model/User";
import { application1JSON, application2JSON, application4JSON } from "./Model/Application";
import { thesisFile1JSON } from "./Model/ThesisFile";
import * as express from "express";
import { deleteAllApplication } from "../Services/DB/ApplicationService";
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
            await
                agent
                    .post('/api/createDB')
                    .expect(200)
            await deleteAllUser();
            await
                agent
                    .post('/api/allCollection')
                    .expect(200);
        });
        it('POST /api/users GET /api/users', async function () {

            await
                agent
                    .post('/api/users/en').send(user1JSON)
                    .set('Accept', 'application/json').expect(200);
            await
                agent
                    .get('/api/users')
                    .expect('Content-Type', /json/)
                    .expect(200).then(response => {
                        equal(response.body[0]._id, user1JSON._id);
                        expect(response.body[0].email).not.toBeUndefined();
                        expect(response.body[0].password).not.toBeUndefined();
                        expect(response.body[0].permission).not.toBeUndefined();
                        expect(response.body[0].registrationDate).not.toBeUndefined();
                    })
        });

        it('POST /api/users  POST /api/users (same email)', async function () {

            await
                agent
                    .post('/api/users/en').send(user1JSON)
                    .set('Accept', 'application/json').expect(200);
            await
                agent
                    .post('/api/users/en').send(user2JSON)
                    .set('Accept', 'application/json').expect(500);

        });

    });

    afterAll(async () => {
        await server.close();
    });
});