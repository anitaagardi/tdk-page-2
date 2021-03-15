export class MenuElement {
    _id: string;
    title: string;
    visible: boolean;
    date: Date;
    content: string;
    constructor(menuElement: any) {
        this._id = menuElement._id;
        this.title = menuElement.title;
        this.visible = menuElement.visible;
        this.date = menuElement.date;
        this.content = menuElement.content;
    }
}