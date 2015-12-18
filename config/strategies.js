/**
 * Created by ReedK on 12/17/15.
 */
var LocalStrategy       = require('passport-local').Strategy,
    FacebookStrategy    = require('passport-facebook').Strategy,
    db                  = require('../models');

module.exports = {
    localStrategy: new LocalStrategy({
            usernameField: 'email'
        },
        function(email, password, done){
            db.member.find({
                where: {
                    email: email
                }
            }).then(function(member){
                if(member){
                    member.checkPassword(password, function(err, result){
                        if(err) return done(err);
                        if(result) {
                            done(null, member.get());
                        } else {
                            done(null, false, {message: 'Invalid password'});
                        }
                    });
                } else {
                    done(null, false, {message: 'Unknown user email'});
                }
            });
        }
    ),
    facebookStrategy: new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
            profileFields: ['email', 'displayName', 'picture.type(large)']
        },
        function(accessToken, refreshToken, profile, done) {
            db.provider.find({
                where: {
                    pid: profile.id,
                    type: profile.provider
                },
                include: [db.member]
            }).then(function(provider) {
                if (provider && provider.member) {
                    provider.token = accessToken;
                    provider.save().then(function() {
                        done(null, provider.member.get());
                    });
                } else {
                    var email = profile.emails[0].value;
                    var name = profile.displayName.split(' ');
                    var firstName = name[0];
                    var lastName = '';
                    for (var i = 1; i < name.length; i++){
                        lastName += name[i] + ' ';
                    }

                    db.member.findOrCreate({
                        where: {email: email},
                        defaults: {first_name: firstName, last_name: lastName, imgLink: profile.photos[0].value}
                    }).spread(function(member, created) {
                        if (created) {
                            member.createProvider({
                                pid: profile.id,
                                token: accessToken,
                                type: profile.provider
                            }).then(function() {
                                done(null, member.get());
                            })
                        } else {
                            done(null, false, {message: 'You already signed up with this email address. Please login'});
                        }
                    });
                }
            });
        }
    ),
    serializeUser: function(member, done){
        done(null, member.id);
    },
    deserializeUser: function(id, done){
        db.member.findById(id).then(function(member){
            done(null, member.get());
        }).catch(done);
    }
};