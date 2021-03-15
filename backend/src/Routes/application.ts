import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Application } from "../Model/Application";
import { Validator } from "../Validator";
import { applicationEmail, reviewerEmail } from "../Services/Email/EmailService";
import { User } from "../Model/User";
import { Error } from '../Model/Error';
import { listUser } from "../Services/DB/UserService";
import { listApplication, insertApplication, updateApplication, deleteApplication, listApplicationsByConferenceId, listApplicationsByUserId } from "../Services/DB/ApplicationService";
import { listThesisFilesByApplicationId } from "../Services/DB/ThesisFileService";
import { ThesisFile } from "../Model/ThesisFile";

export function applicationRoute(app) {
    app.post('/api/users/:userId/applications/:language', checkIsAuthenticated("user"), async function (req, res) {
        const application: Application = new Application(req.body);
        const language = req.params.language;
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.applicationsPostError(application));
        console.log(errors);
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertApplication(application);
            let users: User[] = await listUser(application.userId);
            await applicationEmail(users[0], application, language);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();

    });
    app.post('/api/sendEmailToReviewer', checkIsAuthenticated("faculty admin"), async function (req, res) {
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                let application: Application = new Application(req.body[key]);
                let errors: Error[] = [];
                errors.push.apply(errors, Validator.applicationsPostError(application));
                if (errors.length > 0) {
                    console.log(errors);
                    return res.status(500).send(errors);
                }
                try {
                    let thesisFiles: ThesisFile[] = await listThesisFilesByApplicationId(application._id);
                    if (thesisFiles.length != 0) {
                        for (let i = 0; i < application.reviewers.length; i++) {
                            await reviewerEmail(thesisFiles, application, application.reviewers[i]);

                        }
                    }

                }
                catch (e) {
                    console.log(e);
                    return res.status(500).send(e);
                }
            }
        }


        return res.status(200).send();
    });

    app.get('/api/applications', checkIsAuthenticated("faculty admin"), async function (req, res) {
        let applications: Application[] = [];
        try {
            applications = await listApplication();
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send(applications);
    });
    app.get('/api/applications/:applicationId', checkIsAuthenticated("user"), async function (req, res) {
        const applicationId = req.params.applicationId;
        let applications: Application[] = [];
        try {
            applications = await listApplication(applicationId);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send(applications[0]);
    });
    app.get('/api/users/:userId/applications', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let applications: Application[] = [];
        try {
            applications = await listApplicationsByUserId(userId);
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send(applications);
    });
    app.get('/api/conferences/:conferenceId/applications', checkIsAuthenticated("user"), async function (req, res) {
        const conferenceId = req.params.conferenceId;
        let applications: Application[] = [];
        try {
            applications = await listApplicationsByConferenceId(conferenceId);
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send(applications);
    });
    app.put('/api/applications/:applicationId', checkIsAuthenticated("user"), async function (req, res) {
        const applicationId = req.params.applicationId;
        const application: Application = new Application(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.applicationsPostError(application));
        if (errors.length > 0) {
            return res.status(500).send(errors);
        }
        try {
            await updateApplication(applicationId, application);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.delete('/api/applications/:applicationId', checkIsAuthenticated("admin"), async function (req, res) {
        const applicationId = req.params.applicationId;
        try {
            await deleteApplication(applicationId);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}