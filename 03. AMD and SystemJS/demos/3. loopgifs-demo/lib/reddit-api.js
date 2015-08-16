import jsonp from 'jsonp'

class RedditApi {
    constructor () {
        this.redditURl = 'https://www.reddit.com/r/perfectloops/top.json?sort=top&t=week&jsonp=callbackFunction';
    };
    load() {
        return new Promise ((resolve, reject) => {
                jsonp(this.redditURl, {param: 'jsonp'}, (err, data) => {
                    err ? reject(err) : resolve(data.data.children);
                })
            }
        )
    }
}

export default new RedditApi();