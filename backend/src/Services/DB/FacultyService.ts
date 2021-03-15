
import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { Faculty } from "../../Model/Faculty";

export async function createFaculty() {
    await mongoService.createCollection("Faculty");
}
export async function insertFaculty(faculty: Faculty) {
    await mongoService.insertOneCollection("Faculty", faculty);
}
export async function listFaculty(): Promise<Faculty[]> {
    return await mongoService.listCollection("Faculty", {}, {});
}
export async function listFacultiesByFacultyId(facultyId: string): Promise<Faculty[]> {
    return await mongoService.listCollection("Faculty", { "_id": new ObjectId(facultyId) }, {});
}
export async function updateFaculty(facultyId: string, faculty: Faculty) {
    await mongoService.updateOneCollection("Faculty", { _id: new ObjectId(facultyId) }, { $set: { name: faculty.name, name_EN: faculty.name_EN } });
}
export async function deleteFaculty(facultyId: string) {
    await mongoService.deleteOneCollection("Faculty", { _id: new ObjectId(facultyId) });
}
export async function deleteAllFaculty() {
    await mongoService.deleteCollection("Faculty");
}