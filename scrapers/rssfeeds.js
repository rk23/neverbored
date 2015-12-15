var express = require('express'),
    parser = require('rss-parser'),
    async  = require('async'),
    $       = require('cheerio'),
    router  = express.Router();

router.get('/', function(req, res){

    var links = [ 'http://www.divebuddy.com/rss/blogs_rss.aspx', 'https://www.reddit.com/r/snowboarding/.rss', 'https://www.reddit.com/r/freeflight/.rss'];


     var linksAndHeadlines = {};

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

module.exports = router;