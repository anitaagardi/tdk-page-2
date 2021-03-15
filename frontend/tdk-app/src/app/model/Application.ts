import { Supervisor } from './Supervisor';
import { Author } from './Author';
import { Reviewer } from './Reviewer';

export class Application {
    // tslint:disable-next-line: variable-name
    _id: string;
    userId: string = '';
    tdkConferenceId: string = '';
    status: string = '';
    isEmailSentToReviewer: boolean;
    tdkTitle: string = '';
    tdkTitle_EN: string = '';
    facultySectionName: string = '';
    facultyName: string = '';
    equipments: string = '';
    supervisors: Supervisor[] = [];
    authors: Author[] = [];
    projects: string[] = [];
    reviewers: Reviewer[] = [];
    summary: string = '';
    language: string = '';
}
