var express     = require('express'),
    bodyParser  = require('body-parser'),
    authCtrl    = require('./controllers/auth'),
    homeCtrl    = require('./controllers/home'),
    session     = require('express-session'),
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

app.get('/', function(req, res){
    res.render('index');
});

app.use('/auth', authCtrl);
app.use('/home', homeCtrl);

app.listen(3000);