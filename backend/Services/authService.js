import { UserTypeModel } from '../models/userTypeModel.js';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

//registration
//middleware
export const registration = async (userObj) => {
    //create user document
    const userDoc = new UserTypeModel(userObj);
    //validate the user
    await userDoc.validate();
    //hash the password
    const hashedPassword = await bcrypt.hash(userDoc.password, 10);
    //assigning the hashed password;
    userDoc.password = hashedPassword;
    //save
    const created = await userDoc.save();
    //convert to js obj
    const newUserObj = created.toObject();
    //delete the password
    delete newUserObj.password;
    //return newUserObj withour password
    return newUserObj;
}


//authenticate(login)
export const authenticate = async ({ email, password }) => {

    const user = await UserTypeModel.findOne({ email })
    if (!user) {
        const err = new Error("Invalid Email");
        err.status = 403;
        throw err;
    }

    //compare passwords
    const isMatch = await compare(password, user.password)
    if (!isMatch) {
        const err = new Error("Invalid Password");
        err.status = 403;
        throw err;
    }

    //isActive
    if (user.isActive === false) {
        const err = new Error("You are Blocked by the Admin Please contact the Admin");
        err.status = 403;
        throw err;
    }

    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email },
        process.env.SECRET_KEY, { expiresIn: "1h" })
    const userObj = user.toObject();
    delete userObj.password;
    return { token, user: userObj };
}
