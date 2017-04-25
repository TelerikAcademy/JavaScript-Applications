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

export { MyRouter };