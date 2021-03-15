import { User } from "../Model/User";
import { Validator } from "../Validator";
import { Error } from '../Model/Error';
import { listUserByEmail, updateUser, listUserByEmailAndPsw, insertUser, listUser, deleteUser } from "../Services/DB/UserService";
import { forgottenPasswordEmail, changePasswordEmail, registrationEmail } from "../Services/Email/EmailService";
import { UserChangePassword } from "../Model/UserChangePassword";
import { saltRounds, hashPassword, comparePasswords } from "../app";
import { checkIsAuthenticated } from "./checkIsAuthenticated";

export function userRoute(app) {

    //add an administrator, if no one is in the system
    app.get('/api/admin', async function (req, res) {
        let users: User[] = [];
        try {
            users = await listUser();
            let userPassword = await hashPassword("admin", saltRounds);
            if (users.length == 0 || users == undefined || users == null) {
                const admin: User = new User({
                    email: "anitaagardi@gmail.com",
                    password: userPassword,
                    permission: "admin",
                    name: "Agárdi Anita",
                    registrationDate: new Date()
                });
                await insertUser(admin);
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    })
    app.post('/api/logout', checkIsAuthenticated("user"),
        function (req, res, next) {
            req.logout();
            req.session.destroy(function (err) {
                if (err) { return next(err); res.status(401).send(); }
                res.set('WWW-Authenticate', "xBasic");
                res.status(200).send();
            });
        });

    app.post('/api/isAuthenticated', checkIsAuthenticated("user"),
        function (req, res) {
            res.status(200).send(req.user);
        });

    app.post('/api/forgottenPasswordEmail/:language', async function (req, res) {
        const user: User = new User(req.body);
        const language = req.params.language;
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.userForgottenPasswordEmailPostError(user));
        try {
            let actualUsers: User[] = await listUserByEmail(user.email);
            if (!actualUsers || actualUsers.length == 0) {
                throw new Error('', 'Nincs ilyen email címmel felhasználó');
            }
            let actualUser: User = actualUsers[0];
            var newPassword = Math.random().toString(36).slice(-8);
            actualUser.password = await hashPassword(newPassword, saltRounds);
            await updateUser(actualUser._id, actualUser);
            await forgottenPasswordEmail(actualUser, newPassword, language);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.post('/api/changePassword/:language', checkIsAuthenticated("user"), async function (req, res) {
        const userChangePassword: UserChangePassword = new UserChangePassword(req.body);
        const language = req.params.language;
        console.log(userChangePassword);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.userChangePasswordPostError(userChangePassword));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            let actualUsers: User[] = await listUserByEmail(userChangePassword.email);
            if (!actualUsers || actualUsers.length == 0) {
                throw new Error('', 'Nincs ilyen email címmel felhasználó');
            }
            let actualUser: User = actualUsers[0];
            let isPasswordSame = comparePasswords(actualUser.password, userChangePassword.oldPassword)
            if (!isPasswordSame) {
                throw new Error('', 'Rossz a jelszó');
            }
            actualUser.password = await hashPassword(userChangePassword.newPassword1, saltRounds);
            await updateUser(actualUser._id, actualUser);
            await changePasswordEmail(actualUser, language);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.post('/api/users/:language', async function (req, res) {
        const user: User = new User(req.body);
        const language = req.params.language;
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.userPostError(user));
        console.log(user);
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            let actualUsers: User[] = await listUserByEmail(user.email);
            if (!actualUsers || actualUsers.length == 0) {
                let hashedPassword = await hashPassword(user.password, saltRounds);
                user.password = hashedPassword;
                await insertUser(user);
                await registrationEmail(user, language);
            } else {
                throw new Error('', 'Már van ilyen email címmel felhasználó');
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.get('/api/users', checkIsAuthenticated("admin"), async function (req, res) {
        let users: User[] = [];
        try {
            users = await listUser();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send(users);
    });
    app.get('/api/users/:userId', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        let users: User[] = [];
        try {
            users = await listUser(userId);
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send(users);
    });
    app.delete('/api/users/:userId', checkIsAuthenticated("admin"), async function (req, res) {
        const userId = req.params.userId;
        try {
            await deleteUser(userId);
        } catch (e) {
            return res.status(500).send(e);
        }

        return res.status(200).send();
    });
    app.put('/api/users/:userId', checkIsAuthenticated("user"), async function (req, res) {
        const userId = req.params.userId;
        const newUser: User = new User(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.userPostError(newUser));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updateUser(userId, newUser);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
}