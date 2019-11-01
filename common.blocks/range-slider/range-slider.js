import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/slider';

$('.range-slider').each(function () {
    const slider = $(this);
    slider.slider({
        range: true,
        max: 15000,
        min: 1000,
        values: [ 5000, 10000 ],
        step: 1000,
        slide: function (event, ui) {
            let value = slider.slider( 'values');
            slider.prev('.input-container__caption').html(value.join(' - ') + 'Р');
        }
    });
});