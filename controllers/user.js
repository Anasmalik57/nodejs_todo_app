import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid email or password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));

        sendCookie(user, res, `Welcome Back, ${user.name}`, 200)
    } catch (err) {
        next(err);
    }
};

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already Exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (err) {
        next(err);
    }
};

export const getMyProfile = async (req, res) => {
    ///////////////////////
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// LogOut
export const logout = async (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()),
        sameSite:  process.env.NODE_ENV === "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true
     }).json({
        success: true,
    })
};

