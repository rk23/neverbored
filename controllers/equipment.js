/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    router  = express.Router();

router.get('/:member', function(req, res){
    var memberName = req.params.member;

    res.render('equipment/index');
});

module.exports = router;