const mongoose = require("mongoose");

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
        trim : true
    },
    password : {
        type : String,
        required : true
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


const User = mongoose.model("User", userSchema);

module.exports = User;

