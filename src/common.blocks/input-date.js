import $ from 'jquery';
import moment from 'moment';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/datepicker';

$('.input-date').each(function () {
    $(this).datepicker({
        dateFormat: 'dd.mm.yy',
        showOtherMonths: true,
        selectOtherMonths: true
    });
});