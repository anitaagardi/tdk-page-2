import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Validator } from "../Validator";
import { Faculty } from "../Model/Faculty";
import { Specialization } from "../Model/Specialization";
import { deleteSpecialization, insertSpecialization, listSpecialization, listSpecializationByFacultyIdAndTypeOfSpecializationId, updateSpecialization } from "../Services/DB/SpecializationService";

export function specializationRoute(app) {
    app.post('/api/specializations', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const specialization: Specialization = new Specialization(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.specializationPostError(specialization));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertSpecialization(specialization);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.get('/api/specializations', async function (req, res) {
        let faculties: Faculty[] = [];
        try {
            faculties = await listSpecialization();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties);
    });

    app.get('/api/faculties/:facultyId/typeOfSpecializations/:typeOfSpecializationId/specializations', async function (req, res) {
        const facultyId: string = req.params.facultyId;
        const typeOfSpecializationId: string = req.params.typeOfSpecializationId;
        let faculties: Faculty[] = [];
        try {
            faculties = await listSpecializationByFacultyIdAndTypeOfSpecializationId(facultyId, typeOfSpecializationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(faculties);
    });
    app.put('/api/specializations/:specializationId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const specializationId: string = req.params.specializationId;
        const specialization: Specialization = new Specialization(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.specializationPostError(specialization));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateSpecialization(specializationId, specialization);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });


    app.delete('/api/specializations/:specializationId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const specializationId: string = req.params.specializationId;
        try {
            await deleteSpecialization(specializationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}