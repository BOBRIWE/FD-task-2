import $ from 'jquery';
import SelectObj from './SelectObj';
import RichOption from "./RichOption";

$('.select').each(function() {
    let el = $(this);
    let placeholder = el.data('placeholder') || '';
    const controls = $(el.find('.select__controls'));
    controls.remove();

    let options = $(el.children());
    let selected = $(`<input disabled class="select__selected-input" type="text" placeholder="${placeholder}"/>`);
    let optContainer = $('<div class="select__options"></div>');
    let button = $('<div class="select__button"></div>');
    let isRich = !!el.data('isrich');
    let isExpanded = !!el.data('expanded');
    let richOptions = [];
    let baseQuantity = null;

    if (isExpanded) {
        optContainer.addClass('select__options--expanded');
        el.addClass('select--expanded');
    }

    if (isRich) {
        baseQuantity = 0;
    }

    const select = new SelectObj(el.data('selected'));
    select.onSelectedChanged((val, id) => {
        el.attr('data-selected', id);

        let output = val.getValue;

        if (isRich) {
            let itemsForOutput = [];
            richOptions.forEach((item) => {
                if (item.hasQuantity()) {
                    itemsForOutput.push(item.getValue);
                }
            });

            output = itemsForOutput.join(', ');
        }

        selected.val(output);
    });

    options.each(function (i) {
        const element = $(this);
        const val = element[0].innerHTML;
        const richOption = new RichOption(val, baseQuantity);
        richOptions.push(richOption);
        select.addValue(richOption);
        element.attr('data-id', i);
        element.addClass('select__options__item');

        if (isRich) {
            element.html('');
            element.addClass('select__options__item--rich');

            const q = element.data('quantity');

            if (q !== undefined) richOption.setQuantity = q;

            const add = $(`<div class="select__options__item__add">+</div>`);
            const subs = $(`<div class="select__options__item__subs">-</div>`);
            const quantity = $(`<div class="select__options__item__quantity">${richOption.getQuantity}</div>`);

            element.append(`<div class="select__options__item__item">${val}</div>`);
            element.append(subs);
            element.append(quantity);
            element.append(add);

            select.changeSelected(0);

            if (!richOption.hasQuantity()) {
                subs.toggleClass('select__options__item--disabled');
            }

            richOption.onQuantityChanged(() => {
                quantity.html(richOption.getQuantity);
                subs.removeClass('select__options__item--disabled');
                if (!richOption.hasQuantity()) {
                    subs.addClass('select__options__item--disabled');
                }
            });

            add.on('click', function () {
               richOption.addQuantity();
            });

            subs.on('click', function () {
                richOption.substractQuantity();
            });
        }


        element.on('click', function () {
            select.changeSelected($(this).data('id'));
        })
    });

    el.attr('tabindex', 0);

    hide();
    options.appendTo(optContainer);
    optContainer.appendTo(el);
    selected.appendTo(el);
    button.appendTo(el);
    controls.appendTo(optContainer);

    el.on('click', function (e) {
        show();
    });

    el.on('focusout', function (e) {
        hide();
    });

    controls.find('.select__controls__apply').on('click', function (e) {
        e.stopPropagation();
        hide();
    });

    controls.find('.select__controls__clear').on('click', function (e) {
        e.stopPropagation();
        richOptions.forEach((item) => {
            item.setQuantity = 0;
        });

        select.changeSelected(0);
    });

    function hide() {
        if (!isExpanded) {
            optContainer.addClass('select__options--hidden');
        }
        el.removeClass('select--active');
    }

    function show() {
        optContainer.removeClass('select__options--hidden');
        el.addClass('select--active');
    }
});