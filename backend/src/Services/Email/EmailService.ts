
import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import { User } from "../../Model/User";
import { Application } from "../../Model/Application";
import { Reviewer } from "../../Model/Reviewer";
import { APP_URL, EMAIL_DETAILS, SENDER_EMAIL } from "../../Configuration";
import { ThesisFile } from "../../Model/ThesisFile";


function getMailOptionsRegistrationEmail(user: User, language: string): any {
    if (language == "en") {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Registration ME TDK',
            text: 'You received this message because you successfully registered in the ME TDK page '
                + 'This is a message from the system, please do not reply!'
        };
    } else {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Regisztráció ME TDK',
            text: 'Ezt az üzenetet azért kapta, mert sikeresen regisztrált az ME TDK oldalra. '
                + 'Ez a rendszer által küldött üzenet, kérjük ne válaszoljon rá!'
        };
    }

}

export function registrationEmail(user: User, language: string): Promise<void> {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtpTransport(EMAIL_DETAILS));
        return transporter.sendMail(getMailOptionsRegistrationEmail(user, language)).then(() => {
            resolve();
        }).catch(err => {
            reject(err.message);
        }).finally(() => {

        })
    });
};
function getMailOptionsApplicationEmail(user: User, application: Application, language: string): any {
    if (language == "en") {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Application for the ME TDK conference',
            text: 'You received this message because you successfully applied to the ME TDK conference with the title ' + application.tdkTitle + '. \n \n '
                + 'This is a message from the system, please do not reply!'
        };
    } else {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Jelentkezés az ME TDK konferenciára',
            text: 'Ezt az üzenetet azért kapta, mert sikeresen jelentkezett a(z) ' + application.tdkTitle + ' címmel az ME TDK konferenciára. \n \n'
                + 'Ez a rendszer által küldött üzenet, kérjük ne válaszoljon rá!'
        };
    }
}
export function applicationEmail(user: User, application: Application, language: string): Promise<void> {

    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtpTransport(EMAIL_DETAILS));
        return transporter.sendMail(getMailOptionsApplicationEmail(user, application, language)).then(() => {
            resolve();
        }).catch(err => {
            reject(err.message);
        }).finally(() => {

        })
    });

};
function createMailOptionText(thesisFiles: ThesisFile[], application: Application, reviewer: Reviewer) {
    var emailText = ' Tisztelt ' + reviewer.name + '! <br> <br> Ezt az üzenetet azért kapta, mert felkértük Önt bírálónak  a(z) ' + application.tdkTitle + ' című dolgozatra <br> <br>'
        + 'A dolgozat az alábbi helyen (helyeken) érhető el: <br> <br>';


    for (let i = 0; i < thesisFiles.length; i++) {
        var link = APP_URL + '/api/tdkFiles/' + thesisFiles[i].tdkFile.fileName;
        emailText += "<a href='" + link + "'>" + link + "</a>" + ' <br> <br>';
    }
    if (application.language != "magyar") {
        emailText += "Kérjük, idegen nyelven készítse el a bírálatát!" + ' <br> <br>';
    }
    emailText += 'Ez a rendszer által küldött üzenet, kérjük ne válaszoljon rá!';
    return emailText;
}

export function reviewerEmail(thesisFiles: ThesisFile[], application: Application, reviewer: Reviewer): Promise<void> {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtpTransport(EMAIL_DETAILS));
        var mailOptions = {
            from: SENDER_EMAIL,
            to: reviewer.email,
            subject: 'TDK dolgozat bírálata',
            html: createMailOptionText(thesisFiles, application, reviewer)
        };
        return transporter.sendMail(mailOptions).then(() => {
            resolve();
        }).catch(err => {
            reject(err.message);
        }).finally(() => {

        })
    });
};

function getMailOptionsForgottenPasswordEmail(user: User, newPassword: string, language: string): any {
    if (language == "en") {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Forgotten password ME TDK',
            text: 'You received this message because you requested a new password for the ME TDK site. New password: \n \n ' + newPassword + ' \n \n Please change your password as soon as possible. '
                + 'This is a message from the system, please do not reply!'
        };
    } else {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Elfelejtett jelszó ME TDK',
            text: 'Ezt az üzenetet azért kapta, mert új jelszót igényelt az ME TDK oldalra. Az új jelszó: \n \n' + newPassword + '\n \n kérjük jelszavát mihamarabb változtassa meg.'
                + 'Ez a rendszer által küldött üzenet, kérjük ne válaszoljon rá!'
        };
    }
}
export function forgottenPasswordEmail(user: User, newPassword: string, language: string): Promise<void> {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtpTransport(EMAIL_DETAILS));

        return transporter.sendMail(getMailOptionsForgottenPasswordEmail(user, newPassword, language)).then(() => {
            resolve();
        }).catch(err => {
            reject(err.message);
        }).finally(() => {

        })
    });
};
function getMailOptionsChangePasswordEmail(user: User, language: string): any {
    if (language == "en") {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Changing password ME TDK',
            text: 'You received this message because you changed your password successfully on ME TDK page.'
                + 'This is a message from the system, please do not reply!'
        };
    } else {
        return {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Jelszó csere ME TDK',
            text: 'Ezt az üzenetet azért kapta, mert megváltoztatta jelszavát az ME TDK oldalon.'
                + 'Ez a rendszer által küldött üzenet, kérjük ne válaszoljon rá!'
        };
    }
}
export function changePasswordEmail(user: User, language: string): Promise<void> {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtpTransport(EMAIL_DETAILS));
        return transporter.sendMail(getMailOptionsChangePasswordEmail(user, language)).then(() => {
            resolve();
        }).catch(err => {
            reject(err.message);
        }).finally(() => {

        })
    });
};


