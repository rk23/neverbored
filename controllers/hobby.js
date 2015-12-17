var express = require('express'),
    db      = require('../models'),
    router  = express.Router();

router.get('/all', function(req, res){

    db.hobby.all().then(function(hobbies){
        res.render('hobby/index', {hobbies: hobbies})
    });
});

router.get('/:hobby', function(req, res){
   var hobby = req.params.hobby.toLowerCase();

    //TODO:Capitalize hobby first letter

    db.hobby.find({
        where: {
            name: hobby
        }
    }).then(function(hobby){
        var skis = {
            name: 'Skis',
            price: 343
        };

        var boots = {
            name: 'boots',
            price: 34
        };

        var poles = {
            name: 'poles',
            price: 34
        };
        var equipment = [skis, boots, poles];
        if(hobby){
            res.render('hobby/show', {fullHobby: hobby, equipment: equipment});
        } else {
            req.flash('danger', 'Hobby not found!');
            res.redirect('/')
        }
    })
});

router.post('/:hobby/follow', function(req, res){

    if(!req.session.currentUser) res.render('notloggedin');

    var hobbyId = parseInt(req.body.followID);
    console.log(hobbyId);

    db.hobby.findById(hobbyId).then(function(hobby){
        if(hobby){
            db.member.find({
                where: {
                    id: req.session.currentUser.id
                }
            }).then(function(member){
                if(member){
                    hobby.addMember(member, {active: true, skill_level: 20, interest: 20, scraperlink: 'asdf'}).then(function(){
                        req.flash('success', hobby.name + ' has been added to your account');
                        res.redirect(req.session.lastPage);
                    });
                } else {
                    req.flash('danger', 'Database error: member not found');
                    res.redirect(req.session.lastPage)
                }
            })
        } else {
            req.flash('danger', 'Database error: hobby not found');
            res.redirect(req.session.lastPage);
        }
    });
});

module.exports = router;