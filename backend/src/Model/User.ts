
export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    permission: string;
    registrationDate: Date;
    constructor(user: any) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.permission = user.permission;
        this.registrationDate = user.registrationDate;
    }

}