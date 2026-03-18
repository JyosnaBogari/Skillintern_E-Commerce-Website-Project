import exp from 'express';
import { authenticate } from '../Services/authService.js';
import { UserTypeModel } from '../models/userTypeModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
export const commonRoute = exp.Router()
import bcrypt from 'bcryptjs';

//login
commonRoute.post('/authenticate', async (req, res) => {

    let userCred = req.body;
    let { token, user } = await authenticate(userCred);
    res.cookie("token", token, { httpOnly: true, sameSite:None, secure: true })
    user.password = undefined
    res.status(200).json({ message: "login succesfully", payload: user })
})

//logout we are asking the server to remove the token

//logout/clear the cookies  
commonRoute.get('/logout', async (req, res) => {
    //clear the cookie named 'token'
    res.clearCookie('token', {  //here the details like httpOnly,secure,sameSite should match the created token
        httpOnly: true,
        secure: true, //it can work on both http and https
        sameSite: 'None' //medium restrictions
    });
    res.status(200).json({ message: "logged out succesfully" });
})

//change password
commonRoute.put('/change-password', verifyToken("USER"), async (req, res) => {

    let { email, password, newpassword } = req.body;

    // checking the user is authorized or not
    let user = await UserTypeModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "user email is not exist" });
    }
    // compare passwords
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "password not matched!" })
    }

    let hashedNewPassword = await bcrypt.hash(newpassword, 10)
    let updatedPassword = await UserTypeModel.findByIdAndUpdate(user._id, { $set: { password: hashedNewPassword } }, { new: true })
    //here i need to remove the payload
    res.status(200).json({
        message: "password updated successfully", payload: null
    })
})
