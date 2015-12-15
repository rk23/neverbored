var express     = require('express'),
    db          = require('./models'),
    session     = require('express-session'),
    flash       = require('connect-flash'),
    bodyParser  = require('body-parser'),
    authCtrl    = require('./controllers/auth'),
    homeCtrl    = require('./controllers/home'),
    craigslist  = require('./scrapers/craigslist'),
    snowboarder  = require('./scrapers/snowboarder'),
    rss          = require('./scrapers/rssfeeds'),
    hobbyCtrl   = require('./controllers/hobby'),
    equipmentCtrl   = require('./controllers/equipment'),
    memberCtrl  = require('./controllers/member'),
    feedCtrl    = require('./controllers/feed'),
    searchCtrl    = require('./controllers/search'),
    request     = require('request'),
    app         = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.session.currentUser;
    res.locals.alerts = req.flash();
    next();
});

app.use(function(req, res, next){
    req.session.lastPage = req.header('Referer');
    res.locals.lastPage = req.session.lastPage;
    next();
});

app.use('/', homeCtrl);
app.use('/auth', authCtrl);
app.use('/craigslist', craigslist);
app.use('/snowboarder', snowboarder);
app.use('/rss', rss);
app.use('/h', hobbyCtrl);
app.use('/e', equipmentCtrl);
app.use('/m', memberCtrl);
app.use('/f', feedCtrl);
app.use('/search', searchCtrl);

app.get('*', function(req, res){
    res.render('404');
});

app.listen(3000);