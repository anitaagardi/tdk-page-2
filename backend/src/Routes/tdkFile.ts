import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { TDKFile } from "../Model/TDKFile";
import { Validator } from "../Validator";
import { insertTDKFile, listTDKFile, updateTDKFile } from "../Services/DB/TDKFileService";
import { DIR_NAME } from "../Configuration";


export function tdkFileRoute(app) {
    app.post('/api/tdkFiles', checkIsAuthenticated("admin"), async function (req, res) {
        const tdkFile: TDKFile = new TDKFile(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.tdkFilePostError(tdkFile));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertTDKFile(tdkFile);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/tdkFiles', checkIsAuthenticated("admin"), async function (req, res) {
        let tdkFiles: TDKFile[] = [];
        try {
            tdkFiles = await listTDKFile();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send(tdkFiles);
    });
    app.put('/api/tdkFiles/:tdkFileId', checkIsAuthenticated("admin"), async function (req, res) {
        const tdkFileId = req.params.tdkFileId;
        const newTDKFile: TDKFile = new TDKFile(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.tdkFilePostError(newTDKFile));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateTDKFile(tdkFileId, newTDKFile);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();

    });
    app.get('/api/tdkFiles/:tdkFileName', function (req, res) {
        const tdkFileName = req.params.tdkFileName;
        const file = DIR_NAME + "/" + tdkFileName;
        res.download(file); // Set disposition and send it.
    });

}