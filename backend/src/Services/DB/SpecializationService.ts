
import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { Faculty } from "../../Model/Faculty";
import { TypeOfSpecialization } from "../../Model/TypeOfSpecialization";
import { Specialization } from "../../Model/Specialization";
import { facultyRoute } from "../../Routes/faculty";

export async function createSpecialization() {
    await mongoService.createCollection("Specialization");
}
export async function insertSpecialization(specialization: Specialization) {
    await mongoService.insertOneCollection("Specialization", specialization);
}
export async function listSpecialization(): Promise<Specialization[]> {
    return await mongoService.listCollection("Specialization", {}, {});
}
export async function listSpecializationByFacultyIdAndTypeOfSpecializationId(facultyId, typeOfSpecializationId): Promise<Specialization[]> {
    return await mongoService.listCollection("Specialization", { "facultyId": facultyId, "typeOfSpecializationId": typeOfSpecializationId }, {});
}
export async function updateSpecialization(specializationId: string, specialization: Specialization) {
    await mongoService.updateOneCollection("Specialization", { _id: new ObjectId(specializationId) }, { $set: { facultyId: specialization.facultyId, typeOfSpecializationId: specialization.typeOfSpecializationId, name: specialization.name, name_EN: specialization.name_EN } });
}
export async function deleteSpecialization(specializationId: string) {
    await mongoService.deleteOneCollection("Specialization", { _id: new ObjectId(specializationId) });
}
export async function deleteAllSpecialization() {
    await mongoService.deleteCollection("Specialization");
}