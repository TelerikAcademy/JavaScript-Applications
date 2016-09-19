'use strict';

import 'jquery';

const startButton = 
        $('<button />', { id: 'btn-start' })
            .html('Start the app')
            .prependTo($('body'));

startButton.on('click', function () {

    Promise.all([
        System.import('data'),
        System.import('seed-data'),
        System.import('person-component'),
        'magare'
    ]).then(function (modules) {
        const [data, dataProvider, personComponent, animal] = modules;

        dataProvider.seed();
        personComponent.attachEvents();
    });
});