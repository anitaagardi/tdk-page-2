import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as bcrypt from "bcrypt";
import { BasicStrategy } from "passport-http";
import * as session from "express-session";
import * as multer from "multer";

import { User } from "./Model/User";
import { listUser, listUserByEmail } from "./Services/DB/UserService";
import { conferencesRoute } from "./Routes/conferences";
import { applicationRoute } from "./Routes/application";
import { DBRoute } from "./Routes/DB";
import { menuRoute } from "./Routes/menu";
import { tdkFileRoute } from "./Routes/tdkFile";
import { thesisFileRoute } from "./Routes/thesisFile";
import { userRoute } from "./Routes/user";
import { DIR_NAME } from "./Configuration";
import { photoGalleryRoute } from "./Routes/photoGallery";
import { applicationFileRoute } from "./Routes/applicationFile";
import { facultyRoute } from "./Routes/faculty";
import { specializationRoute } from "./Routes/specialization";
import { typeOfSpecializationRoute } from "./Routes/typeOfSpecialization";
import { tdkSectionRoute } from "./Routes/tdkSection";



export const app = express();
app.use(cors());


export const saltRounds = 10;


app.use(cors());

app.use(session({
    resave: false, saveUninitialized: false,
    secret: 'keyboard cat',
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user: User, done) {
    done(null, user._id);
});

passport.deserializeUser(function (userId: string, done) {
    listUser(userId).then((users: User[]) => {
        done(null, users[0]);
    });
});

passport.use(new BasicStrategy(
    function (email, password, done) {

        listUserByEmail(email).then((users: User[]) => {
            if (users.length == 0) {
                return done("Invalid user data", null);
            } else {
                bcrypt.compare(password, users[0].password, function (err, result) {
                    if (result == true) {
                        return done(null, users[0]);
                    } else {
                        return done("Invalid user data", null);
                    }
                });
            }
        });
    }
));





const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/login', function (req, res, next) {
    passport.authenticate('basic', { session: false }, function (err, user, info) {
        if (!user) {
            res.set('WWW-Authenticate', 'x' + info);
            res.status(401).send('Invalid Authentication');
        } else {
            if (err) { return next(err); }
            req.logIn(user, function (err) {
                if (err) { console.log(err); return next(err); }
                return res.send(user);
            });
        }
    })(req, res, next);
});



export async function hashPassword(password: string, saltRounds: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (error, hash) {
            if (!error) {
                resolve(hash);
            } else {
                reject(error);
            }
        })
    });
}

export async function comparePasswords(password1: string, password2: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password1, password2, function (err, result) {
            return result
        })
    });
}
//file upload
var createdFileName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './' + DIR_NAME)
    },
    filename: function (req, file, cb) {
        //the created date + remove spaces
        createdFileName = Date.now() + '-' + file.originalname.replace(/ /g, '');
        cb(null, createdFileName);
    }
});

var upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
    const documentFile = (req as any).file
    if (!documentFile) {
        console.log("No file received");
        return res.status(500).send("No file received");

    } else {
        console.log('file received');
        return res.status(200).send(createdFileName);
    }


});
//import routes
applicationRoute(app);
conferencesRoute(app);
DBRoute(app);
menuRoute(app);
tdkFileRoute(app);
thesisFileRoute(app);
applicationFileRoute(app);
userRoute(app);
photoGalleryRoute(app);
facultyRoute(app);
typeOfSpecializationRoute(app);
specializationRoute(app);
tdkSectionRoute(app);