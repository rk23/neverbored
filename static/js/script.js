/**
 * Created by ReedK on 12/12/15.
 */

$(function(){

    $('#unfollowHobbyInput').on('click', function(e){
        e.preventDefault();
        var hobbyId = $('#hobbyId').attr('value');

        $.ajax({
            url:'/h/following',
            type: 'DELETE',
            data: {hobbyId: hobbyId},
            success: function(data){
                window.location.reload(true);
            }
        })
    })

    $('#refreshCL').on('click', function(e){
        e.preventDefault();

        $.ajax({
            url: '/craigslist',
            dataType: 'json',
            success: function(data){
                $('#cl-links').empty();
                $.each(data.links, function(i, url){
                    var pTag = $('<p/>', {
                            html: data.dates[i] + ' '
                        }),
                        aTag = $('<a/>', {
                            href: 'https://seattle.craigslist.org/' + url,
                            html: data.headlines[i]
                        });
                    pTag.append(aTag ).append(' ' + data.price[i]).addClass('link');
                    $('#cl-links').append(pTag);
                })
            }
        })
    });

    $('#refreshFeed').on('click', function(e){
        e.preventDefault();
        console.log('made it')
        setTimeout(function(){}, 2000);
        console.log('made it')

        $.ajax({
            url: '/rss',
            dataType: 'json',
            success: function(data){
                $('#feed').empty();
                $.each(data, function(i, website){
                    for (var j = 0; j < website.links.length; j++){
                        var article = $('<article>'),
                            panel = $('<div/>').addClass('panel panel-default'),
                            panelHead = $('<div/>',{
                                href: website.links[j],
                                html: website.headlines[j]
                            } ).addClass('panel-heading'),
                            panelBody = $('<div/>').addClass('panel-body'),
                            pTag = $('<p/>'),
                            aTag = $('<a/>', {
                                href: website.links[j],
                                html: website.headlines[j]
                            }),
                            br = $('<br/>'),
                            img = $('<img/>', {
                                src: website.imgLinks[j]
                        });
                        //article.append(pTag.append(br).append(aTag).append(img)).addClass('feed-article');
                        panel.append(panelHead).append(panelBody.append(img)).addClass('feed-article');
                        $('#feed').append(panel);
                    }
                })
            }
        })
    })



});

