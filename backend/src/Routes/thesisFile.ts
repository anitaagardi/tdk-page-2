import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { ThesisFile } from "../Model/ThesisFile";
import { Validator } from "../Validator";
import { deleteThesisFile, insertThesisFile, listThesisFile, listThesisFilesByApplicationId, listThesisFilesByUserId } from "../Services/DB/ThesisFileService";

export function thesisFileRoute(app) {
    app.post('/api/users/:userId/thesisFiles', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let thesisFile: ThesisFile = new ThesisFile(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.thesisFilePostError(thesisFile));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertThesisFile(thesisFile);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/thesisFiles', checkIsAuthenticated("faculty admin"), async function (req, res) {
        let thesisFiles: ThesisFile[] = [];
        try {
            thesisFiles = await listThesisFile();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(thesisFiles);
    });
    app.get('/api/users/:userId/thesisFiles', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let thesisFiles: ThesisFile[] = [];
        try {
            thesisFiles = await listThesisFilesByUserId(userId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(thesisFiles);
    });

    app.get('/api/applications/:applicationId/thesisFiles', checkIsAuthenticated("user"), async function (req, res) {
        const applicationId = req.params.applicationId
        let thesisFiles: ThesisFile[] = [];
        try {
            thesisFiles = await listThesisFilesByApplicationId(applicationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(thesisFiles);
    });

    app.delete('/api/thesisFiles/:thesisFileId', checkIsAuthenticated("user"), async function (req, res) {
        const thesisFileId = req.params.thesisFileId;
        try {
            await deleteThesisFile(thesisFileId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send();
    });

}