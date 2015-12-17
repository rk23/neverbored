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

    var forSale = false;
    var isWanted = false;

    if(req.body.forSale === '1') {
        forSale = true;
    } else if (req.body.forSale === '2') {
        isWanted = true;
    }

    db.gear.create(newGear).then(function(gear){
           gear.addMember(req.session.currentUser.id, {wanted: isWanted, forSale: forSale, hobbyId: 2}).then(function(){
               req.flash('success','Gear added: ' + gear.name);
               res.redirect(req.session.lastPage);
           })
    });
});

router.get('/mygear', function(req, res){

    if(!req.session.currentUser) res.render('notloggedin');

    db.member.findById(req.session.currentUser.id).then(function(member){
        member.getOwnedGear().then(function(ownedGear){
            member.getGearForSale().then(function(forSale){
                member.getGearWanted().then(function(wanted){
                    res.render('gear/show', {ownedGear: ownedGear, forSale: forSale, wanted: wanted});
                })
            })
        });
    });

});

module.exports = router;