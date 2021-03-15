import { MenuElement } from './MenuElement';

export class Menu {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string = '';
    visible: string = '';
    position: number;
    date: Date;
    menuElements: MenuElement[];
}