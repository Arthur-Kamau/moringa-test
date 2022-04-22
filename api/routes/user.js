var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const emailUtil = require('../util/email-util');
const { sendEmail, validateEmail } = emailUtil;



router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        // console.log("ONE ===================")
        // console.log(err)
        return res.json(info);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
        //   console.log("two ===================")
        //   console.log(err)
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, 'your_jwt_secret', {
          expiresIn: "24h" // it will be expired after 24 hours
        });
        return res.json(
          {
            "success": true,
            "token": token,
            "expires_in": "24h"
  
          }
        );
      });
    })(req, res);
  });

  

router.post('/register', async function (req, res, next) {


    if (req.body.name == undefined || req.body.name.length == 0) {
        return res.json({
            "success": false,
            "reason": "name missing or empty"

        });
    }

    if (req.body.email == undefined || req.body.email.length == 0) {
        return res.json({
            "success": false,
            "reason": "email missing or empty"

        });
    }

    const findByEmail = await usersModel.findOne({
        where: {
            email: req.body.email
        }
    });


    if (findByEmail == undefined) {
        // insert into db 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const us = await usersModel.create({
            name: req.body.name,

            email: req.body.email,

            password: hashedPassword,

        });
        await us.save();



        //send mail 
        try {
            await sendEmail(req.body.email, {
                subject: 'Email verification code',
                text: `Hello, welcome to morianah. Your email code is  ${verification_code} visit https://moringa.art/verify input your email and code to verify`
            });
            return res.json({ "success": true });
        } catch (e) {
            console.log('got an error: ', e);
            // return res.render('error', { error });
            return res.json({ "success": false, "reason": "email sending error" });
        }

    } else {
        return res.json({
            "success": false,
            "reason": "email already exist"

        });
    }




});

module.exports = router;