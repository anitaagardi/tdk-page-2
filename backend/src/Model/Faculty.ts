export class Faculty {
    _id: string;
    name: string;
    name_EN: string;
    constructor(faculty: any) {
        this._id = faculty._id;
        this.name = faculty.name;
        this.name_EN = faculty.name_EN;
    }
}