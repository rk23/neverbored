var express = require('express'),
    db      = require('../models'),
    async   = require('async'),
    router  = express.Router();

router.get('/all', function(req, res){
    db.hobby.all().then(function(hobbies){

        var getFollowerCount = function(hobby, cb){
            hobby.countMembers().then(function(count){
                hobby.followers = count;
                cb(null, count)
            })
        }

        async.concat(hobbies, getFollowerCount, function(err, result){
            console.log(result);
            res.render('hobby/index', {hobbies: hobbies})
        })

    });
});

router.get('/following', function(req, res){

    if(req.user === undefined) {
        res.render('notloggedin');
        return;
    }
    
    db.member.findById(req.user.id).then(function(member){
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

router.delete('/following', function(req, res){
    var hobbyId = req.body.hobbyId;

    db.member.findById(req.user.id).then(function(member){
        member.removeHobby(hobbyId).then(function(){
            req.flash('success', 'Hobby removed from favorites');
            res.sendStatus(200);
        })
    })
})

router.get('/:hobby', function(req, res){
   var hobby = req.params.hobby.toLowerCase();

    //TODO:Capitalize hobby first letter

    db.hobby.find({
        where: {
            name: hobby
        }
    }).then(function(hobby){

        hobby.getGears().then(function(gear){
            if(hobby){
                res.render('hobby/show', {fullHobby: hobby, gear: gear});
            } else {
                req.flash('danger', 'Hobby not found!');
                res.redirect('/')
            }
        })


    })
});

router.post('/:hobby/follow', function(req, res){

    if(req.user === undefined) {
        res.render('notloggedin');
        return;
    }
    var hobbyId = parseInt(req.body.followID);
    console.log(hobbyId);

    db.hobby.findById(hobbyId).then(function(hobby){
        if(hobby){
            db.member.find({
                where: {
                    id: req.user.id
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