let templates = {
    get: function(name) {
        let url = `/templates/${name}.html`;
        return requester.get(url);
    }
};