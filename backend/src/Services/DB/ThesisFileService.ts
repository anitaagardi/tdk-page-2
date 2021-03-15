import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { ThesisFile } from "../../Model/ThesisFile";

export async function insertThesisFile(thesisFile: ThesisFile) {
    await mongoService.insertOneCollection("ThesisFile", thesisFile);
}
export async function listThesisFile(thesisFileId?: string): Promise<ThesisFile[]> {
    if (thesisFileId == null || thesisFileId == undefined) {
        return await mongoService.listCollection("ThesisFile", {}, {});
    }
    else {
        return await mongoService.listCollection("ThesisFile", { "_id": new ObjectId(thesisFileId) }, {});
    }
}
export async function listThesisFilesByUserId(userId: string): Promise<ThesisFile[]> {
    return await mongoService.listCollection("ThesisFile", { "userId": userId }, {});
}
export async function listThesisFilesByApplicationId(applicationId: string): Promise<ThesisFile[]> {
    return await mongoService.listCollection("ThesisFile", { "applicationId": applicationId }, {});
}
export async function deleteThesisFile(thesisFileId: string) {
    await mongoService.deleteOneCollection("ThesisFile", { _id: new ObjectId(thesisFileId) });
}

