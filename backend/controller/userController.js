const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../utils/JWTtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");



// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    console.log('email,password :>> ', email, password);

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
});


// logout user
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        maxAge: 0,
        httpOnly: true,
        overwrite: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    // reset token getting and saving
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Yout password reset token is:- \n\n ${resetPasswordURL} \n\n if you have not requested this request then please ignore it!!! `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Buy up password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${req.body.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});
// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("invalid Reset Password token", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("password doesn't match!", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

exports.getAdminUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
});

exports.assignTask = catchAsyncErrors(async (req, res, next) => {

    const { userIDs, message, subject,userID } = req.body;

    userIDs.map(async (id) => {
        const user = await User.findById(id)
        user.notifs = [...user.notifs, { message: message, subject: subject }]
        // await User.findByIdAndUpdate({ id }, notif)
        await user.save()
    })

    const users = await User.find()

    const user = await User.findById(userID)

    res.status(200).json({
        success: true,
        users,
        user
    })
});

exports.markAsRead = catchAsyncErrors(async (req, res, next) => {

    const { subject, message, userID, notifID, seen } = req.body;

    console.log('req.body :>> ', req.body);

    const user = await User.findById(userID)

    if (!user) {
        return next(new ErrorHandler("invalid Email or Password", 401));
    }

    if (seen) {
        user.notifs.map((x) => {

            if (String(x._id).includes(notifID)) {
                x.seen = true
            }
        })
    }
    if (!seen) {
        user.notifs.map((x) => {
            if (String(x._id).includes(notifID)) {
                x.seen = false
            }
        })
    }

    await user.save()

    res.status(200).json({
        success: true,
        user
    })
});

exports.markall = catchAsyncErrors(async (req, res, next) => {

    const { userID, seen } = req.body;

    const user = await User.findById(userID);

    user.notifs.map((x) => {
        x.seen = seen
    })

    await user.save()

    res.status(200).json({
        success: true,
        user
    })
});