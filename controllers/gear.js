/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    db      = require('../models'),
    async   = require('async'),
    router  = express.Router();

router.get('/all', function(req, res){
    res.render('gear/index')
});

router.post('/add', function(req, res){
    var newGear = {
        name: req.body.gearName,
        value: req.body.gearValue
    }

    console.log(newGear.name.length);
    if(newGear.name.length == 0 || newGear.value.length == 0){
        req.flash('danger','Input needed in both fields');
        res.redirect(req.session.lastPage);
        return;
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
    if(req.session.currentUser === undefined) {
        res.render('notloggedin');
        return;
    }
    db.member.findById(req.session.currentUser.id).then(function(member){
        member.getOwnedGear().then(function(ownedGear){
            member.getGearForSale().then(function(forSale){
                member.getGearWanted().then(function(wanted){
                    res.render('gear/mygear', {ownedGear: ownedGear, forSale: forSale, wanted: wanted});
                })
            })
        });
    });
});

router.get('/classifieds', function(req, res){



    db.member.all().then(function(members){

        var getGearForSale = function(member, cb){
            member.getGearForSale().then(function(forSale){
                cb(null,forSale);
            })
        }

        async.concat(members, getGearForSale, function(err, results){
            res.render('gear/classifieds', {gearForSale: results});
        })

    })

})

module.exports = router;