import { ThesisFile } from './ThesisFile';
export class User {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string = '';
    email: string = '';
    password: string = '';
    permission: string = '';
    registrationDate: Date;
    thesisFiles: ThesisFile[] = [];
}