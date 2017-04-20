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

    for(const {targetUrl, callback} of this._routes) {
      const params = MyRouter.matchUrls(currentUrl, targetUrl);
      if(params) {
        callback(params);
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
      if(targetUrlParts[i][0] !== ':') {
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

export { MyRouter };
