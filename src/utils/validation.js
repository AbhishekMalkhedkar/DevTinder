const validator = require("validator");



const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("firstName or lastName field does not exist");
    }else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong Password");
    }
};

// const validateEditProfileDaata = (req) => {


//     const { photoUrl, about, skills } = req.body;

    

//     if(!validator.isURL(photoUrl)){
//         throw new Error("Invalid PhotoUrl!");
//     }else if(about.length > 200){
//         throw new Error("Reached Maximum limit of about");
//     }
//     else if(skills.length > 10){
//         throw new Error("Reached Maximum length of skills");
//     }

//     const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];

//     const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

//     return isEditAllowed;
// };


const validateEditProfileDaata = (req) => {
    const { photoUrl, about, skills, firstName, lastName, gender, age } = req.body;

    // Check if photoUrl is provided and is valid
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Invalid PhotoUrl!");
    }

    // Check if about is provided and doesn't exceed length limit
    if (about && about.length > 200) {
        throw new Error("Reached Maximum limit of about");
    }

    // Check if skills is provided and doesn't exceed length limit
    if (skills && skills.length > 10) {
        throw new Error("Reached Maximum length of skills");
    }

    // Ensure that only allowed fields are being updated
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    if (!isEditAllowed) {
        throw new Error("Invalid fields in request!");
    }

    return true;  // If all checks pass
};




module.exports = { validateSignUpData, validateEditProfileDaata  };