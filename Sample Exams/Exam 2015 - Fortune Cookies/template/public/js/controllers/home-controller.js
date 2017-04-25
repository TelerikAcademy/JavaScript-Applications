import * as data from 'data';

const $appContainer = $('#app-container');

export function homeController() {

    data.getCookies()
        .then(cookies => {
            $appContainer.html('Loaded cookies');
        });
}