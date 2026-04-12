import express from 'express';
import { authenticate } from '../Services/authService.js';
import { UserTypeModel } from '../models/userTypeModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
export const commonRoute = express.Router()
import bcrypt from 'bcryptjs';

//login
commonRoute.post('/authenticate', async (req, res) => {

    let userCred = req.body;
    let { token, user } = await authenticate(userCred);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };
    res.cookie("token", token, cookieOptions)
    user.password = undefined
    res.status(200).json({ message: "login succesfully", payload: user })
})

//logout we are asking the server to remove the token

//logout/clear the cookies  
commonRoute.get('/logout', async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path:'/'
    };
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ message: "logged out succesfully" });
})

//change password
commonRoute.put('/change-password', verifyToken("USER"), async (req, res) => {

    let { password, newpassword } = req.body;

    if (!password || !newpassword) {
        return res.status(400).json({ message: "Current password and new password are required." });
    }

    let user = await UserTypeModel.findById(req.user.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // compare passwords
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Current password does not match" })
    }

    let hashedNewPassword = await bcrypt.hash(newpassword, 10)
    await UserTypeModel.findByIdAndUpdate(user._id, { $set: { password: hashedNewPassword } }, { new: true })

    res.status(200).json({
        message: "password updated successfully",
        payload: null
    })
})


//page refresh 
commonRoute.get('/check-auth',verifyToken("USER","ADMIN"),async(req,res)=>{
    let user = await UserTypeModel.findById(req.user.userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message:"authenticated",
        payload:user
    })
})