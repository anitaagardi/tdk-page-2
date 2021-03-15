export class Reviewer {
    name: string;
    email: string;
    workplace: string;
    constructor(reviewer: any) {
        this.name = reviewer.name;
        this.email = reviewer.email;
        this.workplace = reviewer.workplace;
    }
}