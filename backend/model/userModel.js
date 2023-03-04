const mongoose = require("mongoose")
const validator = require("validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "name cannot exceed 30 charectors"],
        minLength: [4, "name must have  5 charectors atleast"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "please Enter your Password"],
        minLength: [8, "Password should be greater than 8 charactors"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    notifs: [{
        subject: {
            type: String
        },
        message: {
            type: String,
            required: true
        },
        seen: {
            type: Boolean,
            default: false
        },
        time: {
            type: Date,
            default: Date.now()
        }
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bycrypt.hash(this.password, 10);
});

//jwt tokem
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
};

// password reset token
userSchema.methods.getResetPasswordToken = function () {
    // genrating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hasing and adding to user schema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema)