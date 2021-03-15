export class TDKFile {
    _id: string;
    fileName: string;
    visible: string;
    date: Date;
    constructor(tdkFile: any) {
        this._id = tdkFile._id;
        this.fileName = tdkFile.fileName;
        this.visible = tdkFile.visible;
        this.date = tdkFile.date;
    }
}
