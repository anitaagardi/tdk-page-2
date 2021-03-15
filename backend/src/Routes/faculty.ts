import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Validator } from "../Validator";
import { Faculty } from "../Model/Faculty";
import { deleteFaculty, insertFaculty, listFacultiesByFacultyId, listFaculty, updateFaculty } from "../Services/DB/FacultyService";

export function facultyRoute(app) {
    app.post('/api/faculties', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const faculty: Faculty = new Faculty(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.facultyPostError(faculty));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertFaculty(faculty);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.get('/api/faculties', async function (req, res) {
        let faculties: Faculty[] = [];
        try {
            faculties = await listFaculty();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties);
    });
    app.get('/api/faculties/:facultyId', async function (req, res) {
        const facultyId: string = req.params.facultyId;
        let faculties: Faculty[] = [];
        try {
            faculties = await listFacultiesByFacultyId(facultyId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties[0]);
    });

    app.put('/api/faculties/:facultyId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const facultyId: string = req.params.facultyId;
        const faculty: Faculty = new Faculty(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.facultyPostError(faculty));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateFaculty(facultyId, faculty);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });


    app.delete('/api/faculties/:facultyId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const facultyId: string = req.params.facultyId;
        try {
            await deleteFaculty(facultyId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}