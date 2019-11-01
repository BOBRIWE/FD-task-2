import $ from 'jquery';

$('.like-button').each(function () {
    let currentLikes = $(this).data('likes') || 0;

    if ($(this).is(':checked') || $(this).attr('checked') === 'checked') {
        currentLikes++;
        $(this).next().html(currentLikes);
    }

    $(this).on('click', function () {
        if ($(this).is(':checked')) {
            $(this).next().html(++currentLikes);
        }else {
            if (currentLikes-- < 0) {
                currentLikes = 0;
            }
            $(this).next().html(currentLikes);
        }
    });
});