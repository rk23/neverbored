var express = require('express'),
    bcrypt  = require('bcrypt'),
    db      = require('../models'),
    passport = require('passport'),
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
            req.user = user;
            res.redirect('/');
        }
    });


});


router.post('/login',function(req,res){
    passport.authenticate('local', function(err, member, info) {
        if (member) {
            req.login(member, function(err) {
                if (err) throw err;
                res.redirect(req.session.lastPage);
            });
        } else {
            console.log(info);
            req.flash('danger', 'Could not login');
            res.redirect('/');
        }
    })(req, res);
});

router.get('/login/:provider', function(req, res) {
    passport.authenticate(
        req.params.provider,
        {scope: ['public_profile', 'email']}
    )(req, res);
});

router.get('/callback/:provider', function(req, res) {
    passport.authenticate(req.params.provider, function(err, user, info) {
        if (err) throw err;
        if (user) {
            req.login(user, function(err) {
                if (err) throw err;
                //req.flash('success', 'You are now logged in with ' + req.params.provider);
                res.redirect('/');
            });
        } else {
            req.flash('danger', 'Error');
            res.redirect('/');
        }
    })(req, res);
});

//
//router.post('/login', function(req, res){
//    var email = req.body.loginEmail,
//        password = req.body.loginPassword;
//
//    if(email.length < 2 || password === undefined){
//        res.redirect(req.session.lastPage);
//    } else {
//        db.member.find({
//            where: {
//                email: email
//            }
//        }).then(function(member) {
//            bcrypt.compare(password, member.password, function(err, result) {
//                if (result){
//                    req.session.currentUser = member;
//                    res.redirect(req.session.lastPage);
//                } else {
//                    req.flash('danger', 'Passwords much match');
//                    res.redirect('/');
//                }
//            });
//        });
//    }
//});
//

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/');
});


//router.get('/logout', function(req, res){
//    req.session.currentUser = false;
//    res.redirect('/');
//});

module.exports = router;