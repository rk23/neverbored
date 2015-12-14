var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res){
    res.render('hobby/index');
});

router.get('/:hobby', function(req, res){
   var hobby = req.params.hobby;
    console.log(hobby);

    var fullHobby = {
        name: hobby,
        shortDesc:'Short description',
        time: 0,
        transport: 0,
        solo: true,
        category: 'adrenaline',
        quotes: 'Quote about the sport',
        link: 'http://i.telegraph.co.uk/multimedia/archive/01784/off-piste620_1784286a.jpg'
    };

    res.render('hobby/show', {fullHobby: fullHobby});
});

module.exports = router;