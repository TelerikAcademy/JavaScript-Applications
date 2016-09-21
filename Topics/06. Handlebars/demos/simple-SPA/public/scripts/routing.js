import { data } from './data.js'
import { templateLoader as tl } from './template-loader.js'

const routing = (() => {
    const router = new Navigo(null, false),
        $container = $('#content');
    
    function showMsg(msg, type, cssClass, delay) {
        templateLoader.get('alert')
            .then((alertTemplate) => {
                let container = $(alertTemplate).clone(true)
                    .addClass(cssClass).text(`${type}: ${msg}`)
                    .appendTo(root);

                setTimeout(() => {
                    container.remove();
                }, delay || 3000)
            });
    }

    function init() {
        router.on('threads/:id', (params) => {
            let threadId = params.id;
            Promise.all([data.threads.getById(threadId), tl.get('messages')])
                .then(([data, template]) => $container.append(template(data)))
                .catch((err) => showMsg(err, 'Error', 'alert-danger'));
        }).on('threads', () => {
            Promise.all([data.threads.get(), tl.get('threads')])
                .then(([data, template]) => $container.html(template(data)))
                .catch((err) => showMsg(err, 'Error', 'alert-danger'));
        }).on('gallery', () => {
            Promise.all([data.gallery.get(), tl.get('gallery')]) 
                .then(([data, template]) => $container.html(template(data)))
                .catch((err) => showMsg(err, 'Error', 'alert-danger'))
        })
    }

    function goto(hash) {
        router.navigate(hash.substr(1));
    }

    return{
        init,
        goto
    }
})();

export { routing };