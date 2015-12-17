var express = require('express'),
    bcrypt  = require('bcrypt'),
    db      = require('../models'),
    router  = express.Router();

router.post('/register', function(req, res) {

    var newUser = {
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        email: req.body.inputEmail,
        password: req.body.inputPassword1
    };

    db.member.findOrCreate({
        where: {
            email: newUser.email
        },
        defaults: {
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            password: newUser.password,
            zip: 0
        }
    }).spread(function (user, created) {
        if(!created){
            req.flash('danger', 'Email already registered');
            res.redirect('/');
        } else {
            req.session.currentUser = user;
            res.redirect('/');
        }
    });


});

router.post('/login', function(req, res){
    var email = req.body.loginEmail,
        password = req.body.loginPassword;

    db.member.find({
        where: {
            email: email
        }
    }).then(function(member) {
        bcrypt.compare(password, member.password, function(err, result) {
            if (result){
                req.session.currentUser = member;
                res.redirect(req.session.lastPage);
            } else {
                req.flash('danger', 'Passwords much match');
                res.redirect('/');
            }
        });
    });
});

router.get('/logout', function(req, res){
    req.session.currentUser = false;
    res.redirect('/');
});

module.exports = router;