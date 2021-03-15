import { createDB } from "../Services/DB/DBService";
import { createConference } from "../Services/DB/ConferenceService";
import { createMenu } from "../Services/DB/MenuService";
import { createTDKFile } from "../Services/DB/TDKFileService";
import { createUser } from "../Services/DB/UserService";


//szerintem ez nem is kell ide
export function DBRoute(app) {
    app.post('/api/createDB', async function (req, res) {
        try {
            console.log("Start DB creating");
            await createDB();
            console.log("End DB creating");

        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.post('/api/allCollection', async function (req, res) {
        try {
            await createConference();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        try {
            await createMenu();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        try {
            await createTDKFile();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        try {
            await createUser();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();

    });
}