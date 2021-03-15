import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllTDKFile } from "../Services/DB/TDKFileService";
import { errorTDKFile1JSON, tdkFile1JSON, tdkFile2JSON } from "./Model/TDKFile";
import * as express from "express";
jest.mock("../Configuration", () => ({
    MONGO_URL: "mongodb://localhost:27017/db_test",
    DATABASENAME: "db_test"
}));


jest.mock('../Routes/checkIsAuthenticated', () => ({
    checkIsAuthenticated: jest.fn((additionalScope?: string) => (req: express.Request, res, next) => {
        next();
    }),
}));
//var server, agent;
describe('TDKFile Tests', function () {
    let server, agent;
    beforeAll((done) => {
        console.log("BeforeAll");
        server = app.listen(3000, (err) => {
            if (err) return done(err);
            agent = request.agent(server);
            done();
        });
    });
    describe('TDKFile Test', function () {
        beforeEach(async () => {
            await
                agent
                    .post('/api/createDB')
                    .expect(200)
            await deleteAllTDKFile();
            await
                agent
                    .post('/api/allCollection')
                    .expect(200);
        });
        it('POST /api/tdkFiles GET /api/tdkFiles', async function () {

            await
                agent
                    .post('/api/tdkFiles').send(tdkFile1JSON)
                    .set('Accept', 'application/json').expect(200);
            await
                agent
                    .get('/api/tdkFiles')
                    .expect('Content-Type', /json/)
                    .expect(200).then(response => {
                        equal(response.body[0]._id, tdkFile1JSON._id);
                        expect(response.body[0].fileName).not.toBeUndefined();
                        expect(response.body[0].visible).not.toBeUndefined();
                        expect(response.body[0].date).not.toBeUndefined();
                        expect(response.body[0].visible).toBeTruthy();
                    })
        });
        it('POST /api/tdkFiles GET /api/tdkFiles', async function () {

            await
                agent
                    .post('/api/tdkFiles').send(errorTDKFile1JSON)
                    .set('Accept', 'application/json').expect(500);

        });

    });

    afterAll(async () => {
        await server.close();
    });
});