import { app } from "../app";
import * as request from 'supertest';

jest.mock("../Configuration", () => ({
    MONGO_URL: "mongodb://localhost:27017/db_test",
    DATABASENAME: "db_test"
}));
describe('/api/createDB', function () {
    let server, agent;

    beforeAll((done) => {
        server = app.listen(3000, (err) => {
            if (err) return done(err);
            agent = request.agent(server);
            done();
        });
    });

    it('/api/createDB', async function () {
        await
            agent
                .post('/api/createDB')
                .expect(200)
    });

    afterAll(async () => {
        await server.close();
    });
});