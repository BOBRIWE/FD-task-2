import $ from 'jquery';

$('.select').each(function() {
    let el = $(this);
    let selectedId = el.data('selected');
    let placeholder = el.data('placeholder');
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

    let selected = $(`<input disabled class="select__selected-input" type="text" placeholder="${placeholder}"/>`);
    selected.appendTo(el);

    if(selectedId !== undefined) {
        changeSelected(selectedId);
    }

    let button = $('<div class="select__button"></div>');
    button.appendTo(el);

    el.on('click', function (e) {
        show();
    });

    el.on('focusout', function (e) {
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
        el.attr('data-selected', selectedId);
        selected.val(options[id].innerHTML);
    }
});