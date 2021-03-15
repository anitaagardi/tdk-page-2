import { ObjectId } from "mongodb";
import { mongoService } from "./MongoService";
import { Application } from "../../Model/Application";
export async function insertApplication(application: Application) {
    await mongoService.insertOneCollection("Application", application);
}
export async function listApplication(applicationId?: string): Promise<Application[]> {
    if (applicationId == null || applicationId == undefined) {
        return await mongoService.listCollection("Application", {}, {});
    }
    else {
        return await mongoService.listCollection("Application", { "_id": new ObjectId(applicationId) }, {});
    }
}
export async function listApplicationsByUserId(userId: string): Promise<Application[]> {
    return await mongoService.listCollection("Application", { "userId": userId }, {});
}
export async function listApplicationsByConferenceId(conferenceId: string): Promise<Application[]> {
    return await mongoService.listCollection("Application", { "tdkConferenceId": conferenceId }, {});
}
export async function updateApplication(applicationId: string, application: Application) {
    await mongoService.replaceOneCollection("Application", { "_id": new ObjectId(applicationId) }, { userId: application.userId, tdkConferenceId: application.tdkConferenceId, status: application.status, isEmailSentToReviewer: application.isEmailSentToReviewer, tdkTitle: application.tdkTitle, tdkTitle_EN: application.tdkTitle_EN, facultySectionName: application.facultySectionName, facultyName: application.facultyName, equipments: application.equipments, supervisors: application.supervisors, authors: application.authors, projects: application.projects, reviewers: application.reviewers, summary: application.summary, language: application.language });
}
export async function deleteApplication(applicationId: string) {
    await mongoService.deleteOneCollection("Application", { "_id": new ObjectId(applicationId) });
}
export async function deleteAllApplication() {
    await mongoService.deleteCollection("Application");
}