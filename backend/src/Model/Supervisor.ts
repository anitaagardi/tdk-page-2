export class Supervisor {
    name: string;
    position: string;
    faculty: string;
    institute: string;
    constructor(supervisor: any) {
        this.name = supervisor.name;
        this.position = supervisor.position;
        this.faculty = supervisor.faculty;
        this.institute = supervisor.institute;
    }
}