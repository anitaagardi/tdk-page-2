export const MONGO_URL = "mongodb://localhost:27017/tdkDB";
export const DATABASE_NAME = "tdkDB";
export const DIR_NAME = "tmp";
export const PORT = 3000;
export const APP_URL = 'localhost:' + PORT;
/*export const EMAIL_DETAILS = {
    host: "smtp.gmail.com",
    port: 465,
    service: 'Gmail',
    secure: false,// true for 465, false for other ports
    auth: {
        user: '........@gmail.com',
        pass: '......'
    },
    tls: { rejectUnauthorized: false }
}
export const SENDER_EMAIL = '.....@gmail.com';*/
//always write as according to the eheral generated email
export const EMAIL_DETAILS = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'adrian.mante87@ethereal.email',
        pass: 'wrQm9NXxunM4GavVze'
    }
}
export const SENDER_EMAIL = 'anastasia.mckenzie@ethereal.email';