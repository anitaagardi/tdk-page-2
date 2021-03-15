
export class Conference {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string = '';
    beginDate: Date;
    endDate: Date;
    fileUploadClosingDate: Date;
    dataManagementPolicy: string = '';
    dataManagementPolicy_EN: string = '';
    projects: string[] = [];
}