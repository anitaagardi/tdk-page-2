import * as express from "express";
import { User } from "../Model/User";



export const checkIsAuthenticated = (additionalScope?: string) => (req: express.Request, res, next) => {
    if (req.isAuthenticated()) {
        if (additionalScope == "admin") {
            if ((req.user as User).permission == "admin") {
                next();
            }
        }
        else if (additionalScope == "faculty admin") {
            if ((req.user as User).permission == "admin" || (req.user as User).permission == "kari admin") {
                next();
            }
        }
        else if (additionalScope == "user") {
            next();
        }

        else {
            res.status(403).send("Error");
        }
    } else {
        res.status(403).send("Error");
    }
}