import { mongoService } from "./MongoService";
import { TDKFile } from "../../Model/TDKFile";
import { ObjectId } from "mongodb";
export async function createTDKFile() {
    await mongoService.createCollection("TDKFile");
}
export async function insertTDKFile(tdkFile: TDKFile) {
    await mongoService.insertOneCollection("TDKFile", tdkFile);
}
export async function listTDKFile(): Promise<TDKFile[]> {
    return await mongoService.listCollection("TDKFile", {}, {});
}
export async function updateTDKFile(tdkFileId: string, newTDKFile: TDKFile) {
    await mongoService.updateOneCollection("TDKFile", { _id: new ObjectId(tdkFileId) }, { $set: { fileName: newTDKFile.fileName, visible: newTDKFile.visible, date: newTDKFile.date } });
}
export async function deleteAllTDKFile() {
    await mongoService.deleteCollection("TDKFile");
}