/**
 * Created by ReedK on 12/12/15.
 */
var express     = require('express'),
    request     = require('request'),
    router      = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;