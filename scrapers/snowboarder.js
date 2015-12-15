/**
 * Created by ReedK on 12/14/15.
 */
var express = require('express'),
    $       = require('cheerio'),
    request = require('request'),
    router  = express.Router();

router.get('/', function(req, res){
    request('http://www.snowboarder.com/', function(err, response, html){
        if(!err && response.statusCode == 200){
            var parsedHTML = $.load(html);


            var linkArray = [];
            parsedHTML('article.index-featured h2 a').map(function(i, link){
                var text = $(link).attr('href');
                if(!(text)) return;
                linkArray.push("http://www.snowboarder.com" + text);
            });

            var textArray = [];
            parsedHTML('article.index-featured h2 a').map(function(i, headline){
                var text = $(headline).text();
                if(!(text)) return;
                textArray.push(text);
            });

            var dateArray = [];
            parsedHTML('article.index-featured div.meta time').map(function(i, time){
                var time = $(time).text();
                if(!(time)) return;
                dateArray.push(time);
            });

            var imgArray = [];
            parsedHTML('article.index-featured div.thumbs a img').map(function(i, image){
                var imgLink = $(image).attr('data-srcset');
                if(!(imgLink)) return;
                imgArray.push(imgLink.match(/\S+/g)[0]);
            });


            var linksAndHeadlines = {
                links: linkArray,
                headlines: textArray,
                dates: dateArray,
                imgLinks: imgArray
            };
            res.send(linksAndHeadlines);
        }
    });
});

module.exports = router;