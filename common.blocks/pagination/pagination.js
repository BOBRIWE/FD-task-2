import $ from 'jquery';
import 'bootpag/lib/jquery.bootpag';

$('div.pagination').each(function () {
    const maxSpace = 6;

    const pagination = $(this);
    const max = pagination.data('max');
    const current = pagination.data('current');



    pagination.bootpag({
        maxVisible: maxSpace-2,
        page: current,
        total: 15,
        prevClass: 'pagination__prev',
        nextClass: 'pagination__next',
        activeClass: 'pagination__current'
    });
});