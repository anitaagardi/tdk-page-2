import { MenuElement } from './MenuElement';

export class Menu {
    _id: string;
    name: string;
    visible: boolean;
    position: number;
    date: Date;
    menuElements: MenuElement[];
    constructor(menu: any) {
        this._id = menu._id;
        this.name = menu.name;
        this.visible = menu.visible;
        this.position = menu.position;
        this.date = menu.date;
        if (menu.menuElements) {
            this.menuElements = [];
            for (let i = 0; i < menu.menuElements.length; i++) {
                this.menuElements.push(new MenuElement(menu.menuElements[i]));
            }
        }

    }
}