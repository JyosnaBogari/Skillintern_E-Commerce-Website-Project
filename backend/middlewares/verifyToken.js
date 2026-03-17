import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config(); //load the env files

// ...allowedRoles this takes 
export const verifyToken = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            //read token from  req
            let token = req.cookies.token;
            //console.log("token:",token);
            if (!token) {
                return res.status(401).json({ message: "unauthorized request please login" });
            }
            //verify the validity of the token
            let decodedToken = jwt.verify(token, process.env.SECRET_KEY)

            //check if roe is allowed 
            if (!allowedRoles.includes(decodedToken.role)) {
                return res.status(403).json({ message: "Forbidden. You don't have Permission" });
            }
            // attacj user info to req for use in routes 
            req.user = decodedToken;
            //
            next(); //continue the next statements
        } catch (err) {
            // jwt.verify throw is invalid/expired
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired." });
            }
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid Token.please login" });
            }
            // next(err);
        }
    }
};


