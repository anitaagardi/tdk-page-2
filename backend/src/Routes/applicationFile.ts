import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { ApplicationFile } from "../Model/ApplicationFile";
import { Validator } from "../Validator";
import { deleteApplicationFile, insertApplicationFile, listApplicationFile, listApplicationFilesByApplicationId, listApplicationFilesByUserId } from "../Services/DB/ApplicationFileService";

export function applicationFileRoute(app) {
    app.post('/api/users/:userId/applicationFiles', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let applicationFile: ApplicationFile = new ApplicationFile(req.body);
        console.log("/api/users/:userId/applicationFiles: " + applicationFile);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.applicationFilePostError(applicationFile));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertApplicationFile(applicationFile);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/applicationFiles', checkIsAuthenticated("faculty admin"), async function (req, res) {
        let applicationFiles: ApplicationFile[] = [];
        try {
            applicationFiles = await listApplicationFile();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(applicationFiles);
    });
    app.get('/api/users/:userId/applicationFiles', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let applicationFiles: ApplicationFile[] = [];
        try {
            applicationFiles = await listApplicationFilesByUserId(userId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(applicationFiles);
    });

    app.get('/api/applications/:applicationId/applicationFiles', checkIsAuthenticated("user"), async function (req, res) {
        const applicationId = req.params.applicationId
        let applicationFiles: ApplicationFile[] = [];
        try {
            applicationFiles = await listApplicationFilesByApplicationId(applicationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(applicationFiles);
    });

    app.delete('/api/applicationFiles/:applicationFileId', checkIsAuthenticated("user"), async function (req, res) {
        const applicationFileId = req.params.applicationFileId;
        try {
            await deleteApplicationFile(applicationFileId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send();
    });

}