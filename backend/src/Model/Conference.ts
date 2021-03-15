export class Conference {
    _id: string;
    name: string;
    beginDate: Date;
    endDate: Date;
    fileUploadClosingDate: Date;
    dataManagementPolicy: string;
    dataManagementPolicy_EN: string;
    projects: string[];
    constructor(conference: any) {
        this._id = conference._id;
        this.name = conference.name;
        this.beginDate = conference.beginDate;
        this.endDate = conference.endDate;
        this.fileUploadClosingDate = conference.fileUploadClosingDate;
        this.dataManagementPolicy = conference.dataManagementPolicy;
        this.dataManagementPolicy_EN = conference.dataManagementPolicy_EN;
        if (conference.projects) {
            this.projects = [];
            for (let i = 0; i < conference.projects.length; i++) {
                this.projects.push(conference.projects[i]);
            }
        }
    }
}