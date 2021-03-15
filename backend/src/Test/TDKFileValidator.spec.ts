import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllTDKFile } from "../Services/DB/TDKFileService";
import { errorTDKFile1JSON, errorTDKFile2JSON } from "./Model/TDKFile";
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


        it(' errorTDKFile1JSON POST /api/tdkFiles ', async function () {

            await
                agent
                    .post('/api/tdkFiles').send(errorTDKFile1JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        //console.log(response.body[0]);
                        equal(response.body[0].locationProperty, 'tdkFile.fileName');
                        equal(response.body[1].locationProperty, 'tdkFile.visible');
                        equal(response.body[2].locationProperty, 'tdkFile.date');

                    })


        });
        it('errorTDKFile2JSON POST /api/tdkFiles ', async function () {

            await
                agent
                    .post('/api/tdkFiles').send(errorTDKFile2JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        console.log(response.body[0].locationProperty);
                        equal(response.body.length, 2);
                        equal(response.body[0].locationProperty, 'tdkFile.visible');
                        equal(response.body[1].locationProperty, 'tdkFile.date');

                    });

        });
    });

    afterAll(async () => {
        await server.close();
    });
});