/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    router  = express.Router();

router.get('/all', function(req, res){
    res.render('equipment/index')
})

router.get('/:member', function(req, res){
    var memberName = req.params.member;

    res.render('equipment/show');
});

module.exports = router;