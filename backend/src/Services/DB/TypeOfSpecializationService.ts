
import { mongoService } from "./MongoService";
import { ObjectId } from "mongodb";
import { TypeOfSpecialization } from "../../Model/TypeOfSpecialization";

export async function createTypeOfSpecialization() {
    await mongoService.createCollection("TypeOfSpecialization");
}
export async function insertTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization) {
    await mongoService.insertOneCollection("TypeOfSpecialization", typeOfSpecialization);
}
export async function listTypeOfSpecialization(): Promise<TypeOfSpecialization[]> {
    return await mongoService.listCollection("TypeOfSpecialization", {}, {});
}
export async function listTypeOfSpecializationsByTypeOfSpecializationId(typeOfSpecializationId: string): Promise<TypeOfSpecialization[]> {
    return await mongoService.listCollection("TypeOfSpecialization", { "_id": new ObjectId(typeOfSpecializationId) }, {});
}
export async function updateTypeOfSpecialization(typeOfSpecializationId: string, typeOfSpecialization: TypeOfSpecialization) {
    await mongoService.updateOneCollection("TypeOfSpecialization", { _id: new ObjectId(typeOfSpecializationId) }, { $set: { name: typeOfSpecialization.name, name_EN: typeOfSpecialization.name_EN } });
}
export async function deleteTypeOfSpecialization(typeOfSpecializationId: string) {
    await mongoService.deleteOneCollection("TypeOfSpecialization", { _id: new ObjectId(typeOfSpecializationId) });
}
export async function deleteAllTypeOfSpecialization() {
    await mongoService.deleteCollection("TypeOfSpecialization");
}