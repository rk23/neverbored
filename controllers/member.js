/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res){
    res.render('member/index')
});

module.exports = router;