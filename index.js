var express     = require('express'),
    bodyParser  = require('body-parser'),
    authCtrl    = require('./controllers/auth'),
    homeCtrl    = require('./controllers/home'),
    dataCtrl    = require('./controllers/data'),
    hobbyCtrl   = require('./controllers/hobby'),
    equipmentCtrl   = require('./controllers/equipment'),
    memberCtrl  = require('./controllers/member'),
    feedCtrl    = require('./controllers/feed'),
    searchCtrl    = require('./controllers/search'),
    session     = require('express-session'),
    request     = require('request'),
    $           = require('Cheerio'),
    app         = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next){
    res.locals.currentUser = req.session.currentUser;
    next();
});

app.use('/', homeCtrl);
app.use('/auth', authCtrl);
app.use('/data', dataCtrl);
app.use('/h', hobbyCtrl);
app.use('/e', equipmentCtrl);
app.use('/m', memberCtrl);
app.use('/f', feedCtrl);
app.use('/search', searchCtrl);

app.get('*', function(req, res){
    res.render('404');
});

app.listen(3000);