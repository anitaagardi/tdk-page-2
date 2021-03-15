export class Specialization {
    _id: string;
    facultyId: string;
    typeOfSpecializationId: string;
    name: string;
    name_EN: string;
    constructor(specialization: any) {
        this._id = specialization._id;
        this.facultyId = specialization.facultyId;
        this.typeOfSpecializationId = specialization.typeOfSpecializationId;
        this.name = specialization.name;
        this.name_EN = specialization.name_EN;
    }
}