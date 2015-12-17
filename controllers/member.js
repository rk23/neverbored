/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    db      = require('../models'),
    router  = express.Router();

router.get('/all', function(req, res){

    db.member.findAll().then(function(members){
        res.render('member/index', {members: members})
    });
});

router.get('/following', function(req, res){

    if(!req.session.currentUser) res.render('notloggedin');

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

router.get('/:memberId', function(req, res){
    var memberId = parseInt(req.params.memberId);

    if(!req.session.currentUser) {
        db.member.findById(memberId).then(function(member){
            member.getHobbies().then(function(hobbies){
                res.render('member/show', {userImage: member.imgLink, memberName: member.first_name + ' ' + member.last_name, hobbies: hobbies});
            })
        })
    } else {
        db.member.findById(req.session.currentUser.id).then(function(loggedInMember){
            db.member.findById(memberId).then(function(member){
                member.getHobbies().then(function(theirHobbies){
                    loggedInMember.getHobbies().then(function(myHobbies){
                        res.render('member/compare', {
                            userImage: member.imgLink,
                            memberName: member.first_name + ' ' + member.last_name,
                            theirHobbies: theirHobbies,
                            myHobbies: myHobbies
                        });
                    })
                })
            })
        })
    }

});

module.exports = router;