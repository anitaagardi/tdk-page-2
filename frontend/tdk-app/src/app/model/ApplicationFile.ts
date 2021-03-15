import { TDKFile } from './TDKFile';

export class ApplicationFile {
    // tslint:disable-next-line: variable-name
    _id: string;
    conferenceId: string = '';
    applicationId: string = '';
    userId: string = '';
    tdkFile: TDKFile;
}