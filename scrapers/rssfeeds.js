var express = require('express'),
    parser = require('rss-parser'),
    async  = require('async'),
    $       = require('cheerio'),
    db      = require('../models'),
    router  = express.Router();

router.get('/', function(req, res){
    //'http://www.divebuddy.com/rss/blogs_rss.aspx',
    //var links = [ 'http://imgur.com/r/snowboarding/rss', 'http://imgur.com/r/paragliding/rss', 'http://imgur.com/r/diving/rss', 'http://imgur.com/r/backpacking/rss'];

    var links = [];
    var linksAndHeadlines = {};

    //TODO:Change this to hobbys table after table refactor
    db.membersHobbys.findAll({
        where: {
            memberId: req.session.currentUser.id
        }
    }).then(function(mh){
        mh.forEach(function(hobby){
            links.push(hobby.scraperlink);
        })
    }).then(function(){
        var getStuff = function(url, cb) {
            var linkArray = [],
                textArray = [],
                dateArray = [],
                imgArray = [];

            parser.parseURL(url, function(err, parsed) {
                parsed.feed.entries.forEach(function(entry, i) {
                    linkArray.push(entry.link);
                    textArray.push(entry.title);
                    dateArray.push(entry.pubDate);
                    if ($(entry.content).attr('src')){
                        imgArray.push($(entry.content).attr('src'));
                    } else if($(entry.content).find('img').attr('src')) {
                        imgArray.push($(entry.content).find('img').attr('src'));
                    } else {
                        imgArray.push('nothing here');
                    }
                });
                linksAndHeadlines = {
                    links: linkArray,
                    headlines: textArray,
                    dates: dateArray,
                    imgLinks: imgArray
                };
                cb(null, linksAndHeadlines);
            });
        };

        async.concat(links, getStuff, function(err, results){
            res.send(results);
        });
    });



});

module.exports = router;