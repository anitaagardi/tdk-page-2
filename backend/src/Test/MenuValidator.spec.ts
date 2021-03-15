import { app } from "../app";
import * as request from 'supertest';
import { equal } from "assert";
import { deleteAllMenu } from "../Services/DB/MenuService";
import { menu4JSON, errorMenu1JSON, errorMenu2JSON } from "./Model/Menu";
import { errorMenuElement1JSON, errorMenuElement2JSON } from "./Model/MenuElement";
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
        it(' errorMenu1JSON POST /api/menus', async function () {

            await
                agent
                    .post('/api/menus').send(errorMenu1JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 4);
                        equal(response.body[0].locationProperty, 'menu.name');
                        equal(response.body[1].locationProperty, 'menu.visible');
                        equal(response.body[2].locationProperty, 'menu.position');
                        equal(response.body[3].locationProperty, 'menu.date');

                    })

        });
        it(' errorMenu2JSON POST /api/menus', async function () {

            await
                agent
                    .post('/api/menus').send(errorMenu2JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 3);
                        equal(response.body[0].locationProperty, 'menu.visible');
                        equal(response.body[1].locationProperty, 'menu.position');
                        equal(response.body[2].locationProperty, 'menu.date');

                    })

        });
        it(' errorMenu2JSON POST /api/menus', async function () {

            await
                agent
                    .post('/api/menus').send(errorMenu2JSON)
                    .set('Accept', 'application/json').expect(500).then(response => {
                        equal(response.body.length, 3);
                        equal(response.body[0].locationProperty, 'menu.visible');
                        equal(response.body[1].locationProperty, 'menu.position');
                        equal(response.body[2].locationProperty, 'menu.date');

                    })

        });
        it('errorMenu1JSON POST /api/menus PUT /api/menus/:menuId/menuElements/:menuElementId ', async function () {

            await
                agent
                    .post('/api/menus').send(menu4JSON)
                    .set('Accept', 'application/json').expect(200);

            await
                agent
                    .put('/api/menus/' + menu4JSON._id + '/menuElements/' + menu4JSON.menuElements[0]._id).send(errorMenuElement1JSON)
                    .expect(500).then(response => {
                        equal(response.body.length, 3);
                        equal(response.body[0].locationProperty, 'menuElement.title');
                        equal(response.body[1].locationProperty, 'menuElement.visible');
                        equal(response.body[2].locationProperty, 'menuElement.content');

                    })

        });
        it('errorMenu2JSON POST /api/menus PUT /api/menus/:menuId/menuElements/:menuElementId ', async function () {

            await
                agent
                    .post('/api/menus').send(menu4JSON)
                    .set('Accept', 'application/json').expect(200);

            await
                agent
                    .put('/api/menus/' + menu4JSON._id + '/menuElements/' + menu4JSON.menuElements[0]._id).send(errorMenuElement2JSON)
                    .expect(500).then(response => {
                        equal(response.body.length, 2);
                        equal(response.body[0].locationProperty, 'menuElement.visible');
                        equal(response.body[1].locationProperty, 'menuElement.content');

                    })

        });





    });

    afterAll(async () => {
        await server.close();
    });
});