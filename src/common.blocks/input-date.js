import $ from 'jquery';
import moment from 'moment';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/datepicker';

$('.input-date').each(function () {
    const minDate = moment().add(3, 'days');
    const maxDate =moment().add(9, 'days');
    $(this).datepicker({
        dateFormat: 'dd.mm.yy',
        showOtherMonths: true,
        selectOtherMonths: true,
        // minDate: minDate.toDate(),
        // maxDate: maxDate.toDate(),
        beforeShowDay: function(date) {

            let date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, minDate.format('MM/DD/YYYY'));
            let date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, maxDate.format('MM/DD/YYYY'));
            if (date1 && date && (date1.getTime() == date.getTime())) {
                return [true, 'ui-datepicker-range-start', ''];
            }
            if (date2 && date && (date2.getTime() == date.getTime())) {
                return [true, 'ui-datepicker-range-end', ''];
            }

            if (date >= date1 && date <= date2) {
                return [true, 'ui-datepicker-range-item', ''];
            }
            let d = date.getTime();

            return [true, '', ''];
        },
    });
});