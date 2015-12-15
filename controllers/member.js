/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    db      = require('../models'),
    router  = express.Router();

router.get('/', function(req, res){
    res.render('member/index')
});

router.get('/following', function(req, res){

    db.member.findById(req.session.currentUser.id).then(function(member){
       member.getHobbies().then(function(hobbies){
           if(hobbies){
               res.render('member/hobbies', {hobbies: hobbies})
           } else {
               req.flash('danger', 'Hobbies couldn\'t get got');
               res.redirect(req.session.lastPage);
           }
       })
    });

});

module.exports = router;