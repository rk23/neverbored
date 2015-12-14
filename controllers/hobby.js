var express = require('express'),
    router  = express.Router();

router.get('/all', function(req, res){
    res.render('hobby/index');
});

router.get('/:hobby', function(req, res){
   var hobby = req.params.hobby;

    //TODO:Capitalize hobby first letter

    var fullHobby = {
        name: hobby,
        shortDesc:'Short description',
        time: 0,
        transport: 0,
        solo: true,
        category: 'adrenaline',
        quotes: '"Cronut chia street art gastropub, letterpress chambray affogato put a bird on it keytar. Church-key' +
        ' keytar blog, everyday carry sriracha +1 viral microdosing. Authentic franzen kinfolk tousled wolf paleo."' +
        ' - Somebody',
        link: 'https://i.ytimg.com/vi/61aM0DXpKkc/maxresdefault.jpg'
    };

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

    res.render('hobby/show', {fullHobby: fullHobby, equipment: equipment});
});

module.exports = router;