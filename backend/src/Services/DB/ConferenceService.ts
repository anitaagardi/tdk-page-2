import { mongoService } from "./MongoService";
import { Conference } from "../../Model/Conference";
import { ObjectId } from "mongodb";
export async function createConference() {
    await mongoService.createCollection("Conference");
}
export async function insertConference(conference: Conference) {
    await mongoService.insertOneCollection("Conference", conference);
}
export async function listConference(): Promise<Conference[]> {
    return await mongoService.listCollection("Conference", {}, {});
}

export async function listConferenceById(conferenceId): Promise<Conference[]> {
    return await mongoService.listCollection("Conference", { _id: new ObjectId(conferenceId) }, {});
}
export async function updateConference(conferenceId: string, newConference: Conference) {
    await mongoService.updateOneCollection("Conference", { _id: new ObjectId(conferenceId) }, { $set: { name: newConference.name, beginDate: newConference.beginDate, endDate: newConference.endDate, fileUploadClosingDate: newConference.fileUploadClosingDate, dataManagementPolicy: newConference.dataManagementPolicy, dataManagementPolicy_EN: newConference.dataManagementPolicy_EN, projects: newConference.projects } });
}
export async function deleteConference(conferenceId: string) {
    await mongoService.deleteOneCollection("Conference", { _id: new ObjectId(conferenceId) });
}
export async function deleteAllConference() {
    await mongoService.deleteCollection("Conference");
}
