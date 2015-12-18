var express = require('express'),
    $       = require('cheerio'),
    db      = require('../models'),
    request = require('request'),
    router  = express.Router();

router.get('/', function(req, res){

    db.member.findById(req.user.id).then(function(member){
        member.getGearWanted().then(function(gearWanted){

            var url = 'https://seattle.craigslist.org/search/sss?query=';

            gearWanted.forEach(function(gear){
                url += gear.name + '|';
            })

            request(url, function(err, response, html){
                if(!err && response.statusCode == 200){
                    var parsedHTML = $.load(html);

                    var linkArray = [];
                    parsedHTML('span.txt span.pl a').map(function(i, headline){
                        var text = $(headline).attr('href');
                        if(!(text)) return;
                        linkArray.push(text);
                    });

                    var textArray = [];
                    parsedHTML('span.txt span.pl a').map(function(i, headline){
                        var text = $(headline).text();
                        if(!(text)) return;
                        textArray.push(text);
                    });

                    var dateArray = [];
                    parsedHTML('span.txt span.pl time').map(function(i, time){
                        var time = $(time).attr('title');
                        if(!(time)) return;
                        dateArray.push(time.slice(0, 10) + ': ');
                    });

                    var priceArray = [];
                    parsedHTML('span.txt span.l2').map(function(i, p){
                        var price = '';
                        if($(p).children()[0].attribs.class == 'price'){
                            price = $(p).children()[0].children[0].data;
                        } else {
                            price = 'Not listed';
                        }
                        priceArray.push(price);
                    });

                    //var filteredLinks = [];
                    //var filteredText = [];
                    //var filteredDate = [];
                    //var filteredPrice = [];
                    //
                    //textArray.forEach(function(title, i){
                    //    //if(textArray[i].toLowerCase().indexOf('mountain') !== -1
                    //    //    || textArray[i].toLowerCase().indexOf('shimano') !== -1
                    //    //    || textArray[i].toLowerCase().indexOf('yakima') !== -1){
                    //        filteredText.push(textArray[i]);
                    //        filteredLinks.push(linkArray[i]);
                    //        filteredDate.push(dateArray[i]);
                    //        filteredPrice.push(priceArray[i]);
                    //    //}
                    //});
                    //
                    //var linksAndHeadlines = {
                    //    links: filteredLinks,
                    //    headlines: filteredText,
                    //    dates: filteredDate,
                    //    price: filteredPrice
                    //};
                    var linksAndHeadlines = {
                        links: linkArray,
                        headlines: textArray,
                        dates: dateArray,
                        price: priceArray
                    };

                    res.send(linksAndHeadlines);
                }
            });

        })
    })


});

module.exports = router;