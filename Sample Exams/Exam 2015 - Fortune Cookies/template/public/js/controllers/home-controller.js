import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function homeController() {

    Promise.all([
        //извиквам двата промиса, чиито резултат обработваме директно с desctructuring assignment
        loadTemplate('home'),
        data.getCookies()
    ]).then(([template, cookies]) => {

        // тук вече визуализираме, тъй като имаме темплейта:

        console.log(template);
        console.log(cookies);
        // console.log(cookies);
        // console.log($appContainer.html());

        $appContainer.html(template(cookies));
        // $appContainer.html('test');
    })
}