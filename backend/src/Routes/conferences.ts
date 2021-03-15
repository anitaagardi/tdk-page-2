import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Conference } from "../Model/Conference";
import { Validator } from "../Validator";
import { insertConference, listConference, updateConference, deleteConference, listConferenceById } from "../Services/DB/ConferenceService";

export function conferencesRoute(app) {
    app.post('/api/conferences', checkIsAuthenticated("admin"), async function (req, res) {
        const conference: Conference = new Conference(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.conferencePostError(conference));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertConference(conference);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/conferences', checkIsAuthenticated("user"), async function (req, res) {
        let conferences: Conference[] = [];
        try {
            conferences = await listConference();
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send(conferences);
    });
    app.get('/api/conferences/:conferenceId', checkIsAuthenticated("user"), async function (req, res) {
        const conferenceId = req.params.conferenceId;
        let errors: Error[] = [];
        let conferences: Conference[] = []
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            conferences = await listConferenceById(conferenceId);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send(conferences[0]);
    });
    app.put('/api/conferences/:conferenceId', checkIsAuthenticated("admin"), async function (req, res) {
        const conferenceId = req.params.conferenceId;
        const newConference: Conference = new Conference(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.conferencePostError(newConference));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateConference(conferenceId, newConference);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.delete('/api/conferences/:conferenceId', checkIsAuthenticated("admin"), async function (req, res) {
        const conferenceId = req.params.conferenceId;
        try {
            await deleteConference(conferenceId);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send();

    });
}