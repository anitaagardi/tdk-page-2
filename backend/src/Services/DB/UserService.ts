import { mongoService } from "./MongoService";
import { User } from "../../Model/User";
import { ObjectId } from "mongodb";

export async function createUser() {
    await mongoService.createCollection("User");
}
export async function insertUser(user: User) {
    await mongoService.insertOneCollection("User", user);
}

export async function listUser(userId?: string): Promise<User[]> {
    if (userId == null || userId == undefined) {
        return await mongoService.listCollection("User", {}, {});
    }
    else {
        return await mongoService.listCollection("User", { "_id": new ObjectId(userId) }, {});
    }
}
export async function listUserByEmailAndPsw(email: string, password: string): Promise<User[]> {
    return await mongoService.listCollection("User", { "email": email, "password": password }, {});
}
export async function listUserByEmail(email: string): Promise<User[]> {
    return await mongoService.listCollection("User", { "email": email }, {});
}
export async function updateUser(userId: string, newUser: User) {
    await mongoService.updateOneCollection("User", { "_id": new ObjectId(userId) }, { $set: { name: newUser.name, email: newUser.email, password: newUser.password, permission: newUser.permission, registrationDate: newUser.registrationDate } });
}
export async function deleteUser(userId: string) {
    await mongoService.deleteOneCollection("User", { _id: new ObjectId(userId) })
}

export async function deleteAllUser() {
    await mongoService.deleteCollection("User");
}