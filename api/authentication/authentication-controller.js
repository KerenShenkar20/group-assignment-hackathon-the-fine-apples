const logger = require('../../lib/logs');
const User = require("../../api/users/users-model");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
let message = '';
const url = require('url');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const middlewareEmail = function (req, res, next) {
    const queryObject = url.parse(req.url,true).query;
    if (req.body.email) {
        if (validateEmail(req.body.email)) {
            logger.info('The email is valid');
        }
        else {
            logger.error("The email is invalid");
            return res.status(401).json({ message: "The email is invalid - Please type a valid email" });
        }
    }
    next()
};
const signup = async function (req, res) {
    try{
        if (!req.body.name|| !req.body.password || !req.body.email ) {
            message = "Error - Missing Params -(user_name, password, email) are required params and can not be empty";
            logger.error(message);
            return res.status(401).json({ message });
        }
        let newUser = new User({ _id: mongoose.Types.ObjectId(),  name: req.body.name, password: bcrypt.hashSync(req.body.password, 10), email: req.body.email });
        const user = await User.findOne({ user_name: newUser.user_name });
        if (!user) {
            newUser.save();
            logger.info(newUser);
            return res.status(200).json({ newUser });
        }
    }
    catch {
        message = `Error - can not create this user`;
        logger.error(`${message} ${err}`);
        return res.status(401).json({ message });
    }
};
const login = async function (req, res) {
    try{
        const newUser = { user_name : req.body.user_name, password : req.body.password };
        const profile = await User.findOne({ user_name: newUser.user_name });
        if (!profile) {
            message = "Error - User not exists";
            logger.error(message);
            return res.status(401).json({ message: message });
        }
        else {
            if (!bcrypt.compareSync(profile.password, newUser.password)) {  
                message = "Success - User Loged in";
                logger.info(message);
                logger.info(profile);
                return res.status(200).json({ profile });         
            }
            else { 
                message = "Error - User Unauthorized Access";
                logger.error(message);
                return res.status(401).json({ message: message });    
            }
        }
    }
    catch{
        message = `Error - can not Loged in`;
        logger.error(`${message} ${err}`);
        return res.status(401).json({ message });
    }
};

module.exports = {middlewareEmail, signup, login};



