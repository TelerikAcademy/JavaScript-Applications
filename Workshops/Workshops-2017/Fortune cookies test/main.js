/*jshint esversion: 6 */

const appContainer = $('#app-container');



class MyRouter {

    constructor() {
        this._routes = [];
    }

    on(targetUrl, callback) {
        this._routes.push({
            targetUrl,
            callback
        });
        return this;
    }


    navigate() {
        const currentUrl = location.hash.slice(1);
        for (const route of this._routes) {
            const params = MyRouter.matchUrls(currentUrl, route.targetUrl);
            if (params) {
                console.log(params);
                route.callback(params);
                break;
            }
        }

    }

    static matchUrls(currentUrl, targetUrl) {
        const currentUrlParts = currentUrl.split(/\//g),
            targetUrlParts = targetUrl.split(/\//g);

        if (targetUrlParts.length !== currentUrlParts.length) {

            return false;
        }

        const params = {};

        const len = currentUrlParts.length;
        for (let i = 0; i < len; i += 1) {
            if (targetUrlParts[i][0] !== ':') {
                if (currentUrlParts[i] !== targetUrlParts[i]) {
                    return false;
                }
            } else {
                //махаме двуеточието 
                const paramName = targetUrlParts[i].slice(1);
                params[paramName] = currentUrlParts[i];
            }
        }
        return params;
    }
}


const router = new MyRouter();


//пълним масива routes с таргети и колбеци
router
    .on('/home', () => appContainer.html('Home page'))
    .on('/user', () => appContainer.html('Showing users'))
    .on('/user/:username', (params) => appContainer.html(`Show info for ${params.username.slice(1)}`));



$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());