import $ from 'jquery';

$('.select').each(function() {
    let el = $(this);
    let selectedId = 0;
    el.attr('tabindex', 0);

    let options = $(el.children());
    options.each(function (i) {
        $(this).attr('data-id', i);
        $(this).addClass('select__options__item');
        $(this).on('click', function () {
            selectedId = $(this).data('id');
            hide();
            changeSelected(selectedId);
        })
    });


    let optContainer = $('<div class="select__options"></div>');
    hide();
    options.appendTo(optContainer);
    optContainer.appendTo(el);

    let selected = $('<div class="select__selected"></div>');
    changeSelected(selectedId);
    selected.appendTo(el);

    el.on('click', function (e) {
        show();
    });

    el.on('focusout', function () {
        hide();
    });

    function hide() {
        optContainer.hide();
        el.removeClass('select--active');
    }

    function show() {
        optContainer.show();
        el.addClass('select--active');
    }

    function changeSelected(id) {
        selected.html(options[id].innerHTML);
    }
});