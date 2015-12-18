var express = require('express'),
    parser = require('rss-parser'),
    async  = require('async'),
    $       = require('cheerio'),
    db      = require('../models'),
    router  = express.Router();

router.get('/', function(req, res){
    var links = [];
    var linksAndHeadlines = {};

    db.member.find({
        where: {
            id: req.user.id
        }
    }).then(function(member){
        member.getHobbies().then(function(hobbies){
            hobbies.forEach(function(hobby){
                links.push(hobby.scraperlink);
            })
        }).then(function(){
            var getStuff = function(url, cb) {
                var linkArray = [],
                    textArray = [],
                    dateArray = [],
                    imgArray = [];

                parser.parseURL(url, function(err, parsed) {
                    if(parsed === undefined) {
                        cb(null, null);
                        return;
                    }
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
    })



});

module.exports = router;