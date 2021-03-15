import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllConference } from "../Services/DB/ConferenceService";
import { conference1JSON, conference2JSON, errorConference1JSON } from "./Model/Conference";
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
describe('Conference Tests', function () {
    let server, agent;
    beforeAll((done) => {
        console.log("BeforeAll");
        server = app.listen(3000, (err) => {
            if (err) return done(err);
            agent = request.agent(server);
            done();
        });
    });
    describe('Conference Test', function () {
        beforeEach(async () => {
            await
                agent
                    .post('/api/createDB')
                    .expect(200)
            await deleteAllConference();
            await
                agent
                    .post('/api/allCollection')
                    .expect(200);


        });
        it('POST /api/conferences GET /api/conferences', async function () {
            await
                agent
                    .post('/api/conferences').send(conference1JSON)
                    .set('Accept', 'application/json').expect(200);
            await
                agent
                    .get('/api/conferences')
                    .expect('Content-Type', /json/)
                    .expect(200).then(response => {
                        equal(response.body[0]._id, conference1JSON._id);
                        expect(response.body[0].name).not.toBeUndefined();
                        expect(response.body[0].beginDate).not.toBeUndefined();
                        expect(response.body[0].endDate).not.toBeUndefined();
                        expect(response.body[0].applications).toBeUndefined();
                    })
        });
        it('POST /api/conferences', async function () {
            await
                agent
                    .post('/api/conferences').send(errorConference1JSON)
                    .set('Accept', 'application/json').expect(500);


        });
    });

    afterAll(async () => {
        await server.close();
    });
});