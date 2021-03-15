
import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { TDKSection } from "../../Model/TDKSection";

export async function createTDKSection() {
    await mongoService.createCollection("TDKSection");
}
export async function insertTDKSection(tdkSection: TDKSection) {
    await mongoService.insertOneCollection("TDKSection", tdkSection);
}
export async function listTDKSection(): Promise<TDKSection[]> {
    return await mongoService.listCollection("TDKSection", {}, {});
}
export async function listTDKSectionByFacultyId(facultyId: string): Promise<TDKSection[]> {
    return await mongoService.listCollection("TDKSection", { "facultyId": facultyId }, {});
}
export async function updateTDKSection(tdkSectionId: string, tdkSection: TDKSection) {
    await mongoService.updateOneCollection("TDKSection", { _id: new ObjectId(tdkSectionId) }, { $set: { facultyId: tdkSection.facultyId, name: tdkSection.name, name_EN: tdkSection.name_EN } });
}
export async function deleteTDKSection(tdkSectionId: string) {
    await mongoService.deleteOneCollection("TDKSection", { _id: new ObjectId(tdkSectionId) });
}
export async function deleteAllTDKSection() {
    await mongoService.deleteCollection("TDKSection");
}