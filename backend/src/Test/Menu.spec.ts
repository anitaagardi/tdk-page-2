import { app } from "../app";
import * as request from 'supertest';
import { equal, notDeepEqual } from "assert";
import { deleteAllMenu } from "../Services/DB/MenuService";
import { menu1JSON, menu3JSON, menu2JSON, menu4JSON, errorMenu1JSON } from "./Model/Menu";
import { menuElement2JSON, menuElement1JSON } from "./Model/MenuElement";
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
describe('Menu Tests', function () {
    let server, agent;
    beforeAll((done) => {
        console.log("BeforeAll");
        server = app.listen(3000, (err) => {
            if (err) return done(err);
            agent = request.agent(server);
            done();
        });
    });
    describe('Menu Test', function () {
        beforeEach(async () => {
            await
                agent
                    .post('/api/createDB')
                    .expect(200)
            await deleteAllMenu();
            await
                agent
                    .post('/api/allCollection')
                    .expect(200);
        });
        it('POST /api/menus GET /api/menus', async function () {

            await
                agent
                    .post('/api/menus').send(menu1JSON)
                    .set('Accept', 'application/json').expect(200);
            await
                agent
                    .get('/api/menus')
                    .expect('Content-Type', /json/)
                    .expect(200).then(response => {
                        equal(response.body[0]._id, menu1JSON._id);
                        expect(response.body[0].name).not.toBeUndefined();
                        expect(response.body[0].visible).not.toBeUndefined();
                        expect(response.body[0].position).not.toBeUndefined();
                        expect(response.body[0].date).not.toBeUndefined();
                    })
        });
        it('POST /api/menus GET /api/menus', async function () {

            await
                agent
                    .post('/api/menus').send(errorMenu1JSON)
                    .set('Accept', 'application/json').expect(500);
        });




    });

    afterAll(async () => {
        await server.close();
    });
});