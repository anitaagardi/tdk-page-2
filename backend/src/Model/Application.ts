import { Supervisor } from './Supervisor';
import { Author } from './Author';
import { Reviewer } from './Reviewer';

export class Application {
    _id: string;
    userId: string;
    tdkConferenceId: string;
    isEmailSentToReviewer: boolean;
    status: string;
    tdkTitle: string;
    tdkTitle_EN: string;
    facultySectionName: string;
    facultyName: string;
    equipments: string;
    supervisors: Supervisor[];
    authors: Author[];
    projects: string[] = [];
    reviewers: Reviewer[] = [];
    summary: string;
    language: string;
    constructor(application: any) {
        this._id = application._id;
        this.userId = application.userId;
        this.tdkConferenceId = application.tdkConferenceId;
        this.isEmailSentToReviewer = application.isEmailSentToReviewer;
        this.status = application.status
        this.tdkTitle = application.tdkTitle;
        this.tdkTitle_EN = application.tdkTitle_EN;
        this.facultySectionName = application.facultySectionName;
        this.facultyName = application.facultyName;
        this.equipments = application.equipments;
        this.summary = application.summary;
        this.language = application.language
        if (application.supervisors) {
            this.supervisors = [];
            for (let i = 0; i < application.supervisors.length; i++) {
                this.supervisors.push(new Supervisor(application.supervisors[i]));
            }
        }
        if (application.authors) {
            this.authors = [];
            for (let i = 0; i < application.authors.length; i++) {
                this.authors.push(new Author(application.authors[i]));
            }
        }
        if (application.projects) {
            this.projects = application.projects;
        }
        if (application.reviewers) {
            this.reviewers = [];
            for (let i = 0; i < application.reviewers.length; i++) {
                this.reviewers.push(new Reviewer(application.reviewers[i]));
            }
        }
    }
}