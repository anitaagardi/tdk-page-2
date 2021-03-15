import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Validator } from "../Validator";
import { Faculty } from "../Model/Faculty";
import { TypeOfSpecialization } from "../Model/TypeOfSpecialization";
import { deleteTypeOfSpecialization, insertTypeOfSpecialization, listTypeOfSpecialization, listTypeOfSpecializationsByTypeOfSpecializationId, updateTypeOfSpecialization } from "../Services/DB/TypeOfSpecializationService";

export function typeOfSpecializationRoute(app) {
    app.post('/api/typeOfSpecializations', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const typeOfSpecialization: TypeOfSpecialization = new TypeOfSpecialization(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.typeOfSpecializationPostError(typeOfSpecialization));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertTypeOfSpecialization(typeOfSpecialization);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.get('/api/typeOfSpecializations', async function (req, res) {
        let typeOfSpecializations: TypeOfSpecialization[] = [];
        try {
            typeOfSpecializations = await listTypeOfSpecialization();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(typeOfSpecializations);
    });
    app.get('/api/typeOfSpecializations/:typeOfSpecializationId', async function (req, res) {
        const typeOfSpecializationId: string = req.params.typeOfSpecializationId;
        let typeOfSpecializations: TypeOfSpecialization[] = [];
        try {
            typeOfSpecializations = await listTypeOfSpecializationsByTypeOfSpecializationId(typeOfSpecializationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(typeOfSpecializations[0]);
    });
    app.put('/api/typeOfSpecializations/:typeOfSpecializationId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const typeOfSpecializationId: string = req.params.typeOfSpecializationId;
        const typeOfSpecialization: TypeOfSpecialization = new TypeOfSpecialization(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.typeOfSpecializationPostError(typeOfSpecialization));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateTypeOfSpecialization(typeOfSpecializationId, typeOfSpecialization);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.delete('/api/typeOfSpecializations/:typeOfSpecializationId', checkIsAuthenticated("faculty admin"), async function (req, res) {
        const typeOfSpecializationId: string = req.params.typeOfSpecializationId;
        try {
            await deleteTypeOfSpecialization(typeOfSpecializationId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}