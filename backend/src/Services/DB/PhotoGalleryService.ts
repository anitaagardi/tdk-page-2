
import { mongoService } from "./MongoService";
import { Menu } from "../../Model/Menu";
import { MenuElement } from "../../Model/MenuElement";
import { ObjectId } from "mongodb";
import { PhotoGallery } from "../../Model/PhotoGallery";





export async function createPhotoGallery() {
    await mongoService.createCollection("PhotoGallery");
}
export async function insertPhotoGallery(photoGallery: PhotoGallery) {
    await mongoService.insertOneCollection("PhotoGallery", photoGallery);
}
export async function listPhotoGallery(): Promise<PhotoGallery[]> {
    return await mongoService.listCollection("PhotoGallery", {}, {});
}
export async function listPhotoGalleryByPhotoGalleryId(photoGalleryId: string): Promise<PhotoGallery[]> {
    return await mongoService.listCollection("PhotoGallery", { "_id": new ObjectId(photoGalleryId) }, {});
}
export async function updatePhotoGallery(photoGalleryId: string, photoGallery: PhotoGallery) {
    await mongoService.updateOneCollection("PhotoGallery", { _id: new ObjectId(photoGalleryId) }, { $set: { name: photoGallery.name, tdkFiles: photoGallery.tdkFiles } });
}
export async function deletePhotoGallery(photoGalleryId: string) {
    await mongoService.deleteOneCollection("PhotoGallery", { _id: new ObjectId(photoGalleryId) });
}
export async function deleteAllPhotoGallery() {
    await mongoService.deleteCollection("PhotoGallery");
}