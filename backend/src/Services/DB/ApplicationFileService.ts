import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { ApplicationFile } from "../../Model/ApplicationFile";

export async function insertApplicationFile(applicationFile: ApplicationFile) {
    await mongoService.insertOneCollection("ApplicationFile", applicationFile);
}
export async function listApplicationFile(applicationFileId?: string): Promise<ApplicationFile[]> {
    if (applicationFileId == null || applicationFileId == undefined) {
        return await mongoService.listCollection("ApplicationFile", {}, {});
    }
    else {
        return await mongoService.listCollection("ApplicationFile", { "_id": new ObjectId(applicationFileId) }, {});
    }
}
export async function listApplicationFilesByUserId(userId: string): Promise<ApplicationFile[]> {
    return await mongoService.listCollection("ApplicationFile", { "userId": userId }, {});
}
export async function listApplicationFilesByApplicationId(applicationId: string): Promise<ApplicationFile[]> {
    return await mongoService.listCollection("ApplicationFile", { "applicationId": applicationId }, {});
}
export async function deleteApplicationFile(applicationFileId: string) {
    await mongoService.deleteOneCollection("ApplicationFile", { _id: new ObjectId(applicationFileId) });
}

