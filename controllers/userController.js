// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load Start =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const request = require('request');
const moment = require('moment');
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load End =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 


function generateToken(user){
    var payload = {
        iss: 'bigbossbusiness.com',
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}


// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ User Login =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ //
exports.userLogin = function(req, res, next){
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    let errors = req.validationErrors();
    
    if (errors) {
        return res.status(400).send(errors);
    }else{
        User.findOne({email: req.body.email}, function(err, user){
            if (!user) {
                return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
                'Double-check your email address and try again.'
                });
            }else{
                console.log(user);
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (!isMatch) {
                      return res.status(401).send({ msg: 'Invalid email or password' });
                    }else{
                        res.send({ token: generateToken(user), user: user.toJSON() });
                    }
                    
                });
            }
        })
    }


}



// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 





// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ User Sign Up =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ //
exports.userSignUp = function(req, res, next){

    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'passwords must be at least 5 chars long and contain one number').isLength({ min: 5 }).matches(/\d/),
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }else{
        User.findOne({email: req.body.email}, function(err, user){
            if(user){
                return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
            }else{
                user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
            
                user.save(function(err){
                    if(err){
                        return res.status(400).send({msg: err});
                    }else{
                        res.send({ token: generateToken(user), user: user });
                    }
                })
            }
        })
    }
}
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 