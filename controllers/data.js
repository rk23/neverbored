var express = require('express'),
    $       = require('cheerio'),
    request = require('request'),
    router  = express.Router();

router.get('/', function(req, res){
    request('https://seattle.craigslist.org/search/sss?query=bike', function(err, response, html){
        if(!err && response.statusCode == 200){
            var parsedHTML = $.load(html);

            var linkArray = [];
            parsedHTML('.pl a').map(function(i, headline){
                var text = $(headline).attr('href');
                if(!(text)) return;
                linkArray.push(text);
            });

            var textArray = [];
            parsedHTML('.pl a').map(function(i, headline){
                var text = $(headline).text();
                if(!(text)) return;
                textArray.push(text);
            });

            var dateArray = [];
            parsedHTML('.pl time').map(function(i, time){
                var time = $(time).attr('title');
                if(!(time)) return;
                dateArray.push(time.slice(0, 10) + ': ');
            });

            var filteredLinks = [];
            var filteredText = [];
            var filteredDate = [];

            textArray.forEach(function(title, i){
                if(textArray[i].toLowerCase().indexOf('mountain') !== -1
                    || textArray[i].toLowerCase().indexOf('shimano') !== -1
                    || textArray[i].toLowerCase().indexOf('yakima') !== -1){
                    filteredText.push(textArray[i]);
                    filteredLinks.push(linkArray[i]);
                    filteredDate.push(dateArray[i]);
                }
            });

            var linksAndHeadlines = {
                links: filteredLinks,
                headlines: filteredText,
                dates: filteredDate
            };

            res.send(linksAndHeadlines);
        }
    });
});

module.exports = router;