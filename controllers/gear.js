/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    db      = require('../models'),
    router  = express.Router();

router.get('/all', function(req, res){
    res.render('gear/index')
});

router.post('/add', function(req, res){
    var newGear = {
        name: req.body.gearName,
        value: req.body.gearValue
    }

    db.gear.create(newGear).then(function(gear){
           gear.addMember(req.session.currentUser.id, {wanted: false, forSale: false, hobbyId: 2}).then(function(something){
               req.flash('success','Gear added');
               res.redirect(req.session.lastPage);
           })
    });
});

router.get('/:member', function(req, res){
    var memberName = req.params.member;

    db.member.findById(req.session.currentUser.id).then(function(member){
        member.getGears().then(function(g){
            res.render('gear/show', {gears: g});
        })
    });

});

module.exports = router;