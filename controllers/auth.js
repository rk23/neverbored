/**
 * Created by ReedK on 12/12/15.
 */
var express = require('express'),
    bcrypt  = require('bcrypt'),
    router  = express.Router();

router.post('/register', function(req, res) {
    req.session.currentUser = true;
    res.redirect('/');
});

router.post('/login', function(req, res){
    req.session.currentUser = true;
    res.redirect('/');
});

router.get('/logout', function(req, res){
    req.session.currentUser = false;
    res.redirect('/');
});

module.exports = router;