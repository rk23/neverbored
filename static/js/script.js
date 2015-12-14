/**
 * Created by ReedK on 12/12/15.
 */
$(function(){
    $('#refreshCL').on('click', function(e){
        e.preventDefault();

        $.ajax({
            url: '/data',
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
                        })
                    pTag.append(aTag).addClass('link');
                    $('#cl-links').append(pTag);
                })
            }
        })
    })


});