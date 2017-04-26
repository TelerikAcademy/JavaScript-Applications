const appContainer = $('#app-container');

class MyRouter {
    constructor() {
        this._routes = [];
    }

    on(targetUrl, callback) {
            this._routes.push({
                targetUrl,
                callback
            })
            return this;
        }
    
    
    navigate() {
        const currentUrl = location.hash.slice(1);

        for(const {targetUrl, callback} of this._routes) {
            const params = MyRouter.matchUrls(currentUrl, targetUrl);
            if(params) {
            return callback(params);
            break;
            }
        }
    }

static matchUrls(currentUrl, targetUrl) {
    const currentUrlParts = currentUrl.split(/\//g);
    const targetUrlParts = targetUrl.split(/\//g);

    if(targetUrlParts.length !== currentUrlParts.length) {
        return false;
    }
    const params = {};

    const len = currentUrlParts.length;
    for(let i = 0; i < len; i += 1) {
        if(targetUrlParts[i][0] !== ':'){
            if(currentUrlParts[i] !== targetUrlParts[i]) {
                return false;
            }
        }
         else {
            const paramName = targetUrlParts[i].slice(1);
            params[paramName] = currentUrlParts[i];
        }
    }
    return params;
}
}

const router = new MyRouter();
router
    .on('/home', () => appContainer.html('Home page'))
    .on('/user', () => appContainer.html('Showing users'))
    .on('/user/:username', (params) => appContainer.html(`Showing info for ${params.username}`));

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());


// const appContainer = $('#app-container');

// function matchUrls(currentUrl, targetUrl) {
//     const currentUrlParts = currentUrl.split(/\//g);
//     const targetUrlParts = targetUrl.split(/\//g);

//     if(targetUrlParts.length !== currentUrlParts.length) {
//       return false;
//     }

//     const params = {};

//     const len = currentUrlParts.length;
//     for(let i = 0; i < len; i += 1) {
//       if(targetUrlParts[i][0] !== ':') {
//         if(currentUrlParts[i] !== targetUrlParts[i]) {
//           return false;
//         }
//       }
//       else {
//         const paramName = targetUrlParts[i].slice(1);
//         params[paramName] = currentUrlParts[i];
//       }
//     }

//     return params;
//   }

// function matchHashUrl(targetUrl) {
//     const currentUrl = location.hash.slice(1);
//     return matchUrls(currentUrl, targetUrl)
// }

// $(window).on('hashchange', (ev) => {
//     let params = matchHashUrl('/home');
//     if(params) {
//         appContainer.html('Home page');
//         return;
//     } params = matchHashUrl('/user')
//         if(params) {
//         appContainer.html('Showing users');
//         return;
//     } params = matchHashUrl('/user/:username')
//         if(params) {
//         appContainer.html(`Showing info for ${params.username}`);
//         return;
//     }
// });