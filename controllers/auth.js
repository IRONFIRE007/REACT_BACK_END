const express = require("express");
const  bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const {generateJWT} = require("../helpers/jwt")

const createUser = async (req, res = express.response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ ok: false, msg: "The User Exist" });
        }

        user = new User(req.body);

       // Hash Password
   
     const salt = bcrypt.genSaltSync();

     user.password = bcrypt.hashSync(password,salt);

        await user.save();

 //Generate JWT
 const token = await generateJWT(user.id,user.name);

        res.status(201).json({ ok: true,uid:user.uid, name:user.name,token});

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ ok: false, msg: "Error has to communicate with the Admin " });
    }
};

const loginUser = async(req, res = express.response) => {
    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ ok: false, msg: "The User not Exist" });
        }

        //Comfirm Password

        const validPassword = bcrypt.compareSync(password, user.password);
         

       if(!validPassword) {
           return res.status(400).json({ ok: false, msg: "The Password Incorrect"})
       }

           //Generate JWT
 const token = await generateJWT(user.id,user.name);

 res.status(201).json({ ok: true,uid:user.uid, name:user.name,token});



    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ ok: false, msg: "Error has to communicate with the Admin " });
    }
};



const renewToken = async(req, res) => {

    const {uid,name} = req;
     
    //Renew token
    const token =  await generateJWT(uid,name);

    res.json({ ok: true,token});
};

module.exports = { createUser, loginUser, renewToken };
 