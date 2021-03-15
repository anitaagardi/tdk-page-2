import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Validator } from "../Validator";
import { Faculty } from "../Model/Faculty";
import { TDKSection } from "../Model/TDKSection";
import { deleteTDKSection, insertTDKSection, listTDKSection, listTDKSectionByFacultyId, updateTDKSection } from "../Services/DB/TDKSectionService";

export function tdkSectionRoute(app) {
    app.post('/api/tdkSections', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const tdkSection: TDKSection = new TDKSection(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.tdkSectionPostError(tdkSection));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertTDKSection(tdkSection);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.get('/api/tdkSections', async function (req, res) {
        let faculties: Faculty[] = [];
        try {
            faculties = await listTDKSection();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties);
    });

    app.get('/api/faculties/:facultyId/tdkSections', async function (req, res) {
        const facultyId: string = req.params.facultyId;
        let faculties: Faculty[] = [];
        try {
            faculties = await listTDKSectionByFacultyId(facultyId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties);
    });

    app.put('/api/tdkSections/:tdkSectionId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const tdkSectionId: string = req.params.tdkSectionId;
        const tdkSection: TDKSection = new TDKSection(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.tdkSectionPostError(tdkSection));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateTDKSection(tdkSectionId, tdkSection);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.delete('/api/tdkSections/:tdkSectionId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const tdkSectionId: string = req.params.tdkSectionId;
        try {
            await deleteTDKSection(tdkSectionId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}