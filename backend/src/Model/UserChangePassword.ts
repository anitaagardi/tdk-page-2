export class UserChangePassword {
    email: string;
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;
    constructor(userChangePassword: any) {
        this.email = userChangePassword.email;
        this.oldPassword = userChangePassword.oldPassword;
        this.newPassword1 = userChangePassword.newPassword1;
        this.newPassword2 = userChangePassword.newPassword2;
    }
}