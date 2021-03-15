import { TDKFile } from './TDKFile';

export class ApplicationFile {
    _id: string;
    conferenceId: string;
    applicationId: string;
    userId: string;
    tdkFile: TDKFile;
    constructor(thesisFile: any) {
        this._id = thesisFile._id;
        this.conferenceId = thesisFile.conferenceId;
        this.applicationId = thesisFile.applicationId;
        this.userId = thesisFile.userId;
        this.tdkFile = new TDKFile(thesisFile.tdkFile);
    }
}