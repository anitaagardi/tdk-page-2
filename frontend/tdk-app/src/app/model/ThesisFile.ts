import { TDKFile } from './TDKFile';

export class ThesisFile {
    // tslint:disable-next-line: variable-name
    _id: string;
    conferenceId: string = '';
    applicationId: string = '';
    userId: string = '';
    tdkFile: TDKFile;
}