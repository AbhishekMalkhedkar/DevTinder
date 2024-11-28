const adminAuth = (req, res, next) => {
    console.log("Admin authentication is being checked!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request!");
    }else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User authentication is being checked!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request!");
    }else{
        next();
    }
};

module.exports = { adminAuth, userAuth };