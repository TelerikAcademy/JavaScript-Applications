import {get as getRequest } from 'requester';
// import { Handlebars } from 'handlebars';


export function load(templateName) {
    //обект за кеширане на темплейта
    const cashObj = {};

    if (cashObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cashObj[templateName]); // ако вече е зареждан този темплейт, да го дърпа от тук
    }

    return getRequest(`templates/${templateName}.handlebars`)
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            cashObj[templateName] = compiledTemplate; // записва в обекта темплейта (кешира го)
            return Promise.resolve(compiledTemplate);
        }) //връща промис
}