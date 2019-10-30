import $ from 'jquery';

$('.expandable-list').each(function () {
    const button = $('<div></div>');
    const list = $(this);
    const header = list.find('.expandable-list__header');
    let isExpanded = !!list.data('expanded');
    button.addClass('expandable-list__button');

    list.find('.expandable-list__header').append(button);

    if (!isExpanded) {
        expand();
    }

    button.on('click', function () {
        expand();
    });

    function expand() {
        header.nextAll().toggle();
        button.toggleClass('expandable-list__button--expanded');
    }
});