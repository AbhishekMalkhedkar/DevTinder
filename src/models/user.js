const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        index : true,
        minLength : 4,
        maxLength : 15
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
        default : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
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

// User.find({ firstName: "Abhishek", lastName : "Malkhedkar"})
userSchema.index({firstName : 1, lastName : 1});

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

