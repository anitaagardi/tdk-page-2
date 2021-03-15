import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllConference } from "../Services/DB/ConferenceService";
import { errorConference1JSON, errorConference2JSON } from "./Model/Conference";
import * as express from "express";
jest.mock("../Configuration", () => ({
    MONGO_URL: "mongodb://localhost:27017/db_test",
    DATABASENAME: "db_test"
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
        it(' errorConference1JSON POST /api/conferences', async function () {

            await
                agent
                    .post('/api/conferences').send(errorConference1JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 3);
                        equal(response.body[0].locationProperty, 'conference.name');
                        equal(response.body[1].locationProperty, 'conference.beginDate');
                        equal(response.body[2].locationProperty, 'conference.endDate');

                    })

        });
        it('errorConference2JSON POST /api/conferences', async function () {

            await
                agent
                    .post('/api/conferences').send(errorConference2JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 2);
                        equal(response.body[0].locationProperty, 'conference.beginDate');
                        equal(response.body[1].locationProperty, 'conference.endDate');

                    })

        });

    });

    afterAll(async () => {
        await server.close();
    });
});