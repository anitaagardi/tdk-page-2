export class TypeOfSpecialization {
    _id: string;
    name: string;
    name_EN: string;
    constructor(typeOfSpecialization: any) {
        this._id = typeOfSpecialization._id;
        this.name = typeOfSpecialization.name;
        this.name_EN = typeOfSpecialization.name_EN;
    }
}