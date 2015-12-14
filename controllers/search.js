/**
 * Created by ReedK on 12/13/15.
 */
var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res){
   var search = req.query.search;
    res.redirect('/h/' + search);
});

module.exports = router;