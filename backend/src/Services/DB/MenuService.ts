
import { mongoService } from "./MongoService";
import { Menu } from "../../Model/Menu";
import { MenuElement } from "../../Model/MenuElement";
import { ObjectId } from "mongodb";

export async function createMenu() {
    await mongoService.createCollection("Menu");
}
export async function insertMenu(menu: Menu) {
    await mongoService.insertOneCollection("Menu", menu);
}
export async function insertMenuElement(menuId: string, menuElement: MenuElement) {
    await mongoService.updateOneCollection("Menu", { _id: new ObjectId(menuId) }, { $push: { "menuElements": menuElement } });
}
export async function listMenu(): Promise<Menu[]> {
    return await mongoService.listCollection("Menu", {}, {});
}
export async function listMenusByMenuId(menuId: string): Promise<Menu[]> {
    return await mongoService.listCollection("Menu", { "_id": new ObjectId(menuId) }, {});
}
export async function listMenuElementByMenuId(menuId: string, menuElementId: string): Promise<MenuElement[]> {
    return await mongoService.listCollection("Menu", { "_id": new ObjectId(menuId), "menuElements._id": menuElementId }, {});
}
export async function updateMenu(menuId: string, menu: Menu) {
    await mongoService.updateOneCollection("Menu", { _id: new ObjectId(menuId) }, { $set: { name: menu.name, visible: menu.visible, position: menu.position, date: menu.date, menuElements: menu.menuElements } });
}
export async function updateMenuElement(menuId: string, menuElementId: string, menuElement: MenuElement) {
    await mongoService.updateOneCollection("Menu", { "_id": new ObjectId(menuId), "menuElements._id": menuElementId }, { $set: { "menuElements.$": menuElement } });
}

export async function deleteMenu(menuId: string) {
    await mongoService.deleteOneCollection("Menu", { _id: new ObjectId(menuId) });
}
export async function deleteMenuElement(menuId: string, menuElementId: string) {
    await mongoService.updateOneCollection("Menu", { _id: new ObjectId(menuId) }, { $pull: { 'menuElements': { _id: menuElementId } } });
}
export async function deleteAllMenu() {
    await mongoService.deleteCollection("Menu");
}