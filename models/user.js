const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password : " + value);
            }
        }
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl : {
        type : String,
        default : "https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fclipart-library.com%2Fclip-art%2F280-2806732_png-file-svg-default-profile-picture-png.htm&psig=AOvVaw27Mvc3KAWbNA-LDEoBYLp3&ust=1733329756379000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjavdqCjIoDFQAAAAAdAAAAABAQ",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url address: " + value);
            }
        }
    },
    about : {
        type : String,
        default : "This is default bio"
    },
    skills : {
        type : [String],
    }
},
{
    timestamps: true,
}
);

userSchema.methods.getJWT = async function () {

    const user = this;

    const token = await jwt.sign({ _id : user._id }, "DEV@Tinder$798");

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordvalid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordvalid;
};


const User = mongoose.model("User", userSchema);

module.exports = User;

