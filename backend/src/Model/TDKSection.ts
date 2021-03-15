export class TDKSection {
    _id: string;
    facultyId: string;
    name: string;
    name_EN: string;
    constructor(tdkSection: any) {
        this._id = tdkSection._id;
        this.facultyId = tdkSection.facultyId;
        this.name = tdkSection.name;
        this.name_EN = tdkSection.name_EN;
    }
}