import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Menu } from "../Model/Menu";
import { Validator } from "../Validator";
import { insertMenu, insertMenuElement, listMenu, updateMenu, updateMenuElement, deleteMenu, deleteMenuElement, listMenusByMenuId, listMenuElementByMenuId } from "../Services/DB/MenuService";
import { MenuElement } from "../Model/MenuElement";

export function menuRoute(app) {
    app.post('/api/menus', checkIsAuthenticated("admin"), async function (req, res) {
        const menu: Menu = new Menu(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.menuPostError(menu));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertMenu(menu);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.post('/api/menus/:menuId/menuElements', checkIsAuthenticated("admin"), async function (req, res) {
        const menuId = req.params.menuId;
        const menuElement: MenuElement = new MenuElement(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.menuElementsPostError(menuElement));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertMenuElement(menuId, menuElement);

        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/menus', async function (req, res) {
        let menus: Menu[] = [];
        try {
            menus = await listMenu();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(menus);
    });
    app.get('/api/menus/:menuId', async function (req, res) {
        const menuId = req.params.menuId;
        let menus: Menu[] = [];
        try {
            menus = await listMenusByMenuId(menuId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(menus[0]);
    });
    app.get('/api/menus/:menuId/menuElements/:menuElementId', async function (req, res) {
        const menuId = req.params.menuId;
        const menuElementId = req.params.menuElementId;
        let menuElement: MenuElement[] = [];
        try {
            menuElement = await listMenuElementByMenuId(menuId, menuElementId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send(menuElement[0]);
    });

    app.put('/api/menus/:menuId', checkIsAuthenticated("admin"), async function (req, res) {
        const menuId = req.params.menuId;
        const menu: Menu = new Menu(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.menuPostError(menu));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateMenu(menuId, menu);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    //update menu element
    app.put('/api/menus/:menuId/menuElements/:menuElementId', checkIsAuthenticated("admin"), async function (req, res) {
        const menuId = req.params.menuId;
        const menuElementId = req.params.menuElementId;
        const menuElement: MenuElement = new MenuElement(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.menuElementsPostError(menuElement));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateMenuElement(menuId, menuElementId, menuElement);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    //delete menu
    app.delete('/api/menus/:menuId', checkIsAuthenticated("admin"), async function (req, res) {
        const menuId = req.params.menuId;
        try {
            await deleteMenu(menuId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    //delete menu element
    app.delete('/api/menus/:menuId/menuElements/:menuElementId', checkIsAuthenticated("admin"), async function (req, res) {
        const menuId = req.params.menuId;
        const menuElementId = req.params.menuElementId;
        try {
            await deleteMenuElement(menuId, menuElementId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}