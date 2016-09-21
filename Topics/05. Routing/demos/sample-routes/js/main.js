import { jquery } from 'jquery'

$(() => {
  const result = $('#result'),
    router = new Navigo(null, false);

  function print(text) {
    result.text(JSON.stringify(text));
  }

  router
    .on('test', (params) => {      
        print(params);
    })
    //.on('book/:id/note/:noteId', print) // order matters
    .on({
      //'book/:id/note/:noteId' : print // order does not matter
      'book/:id': params => print(params),
      //'book/:id/note/:noteId' : print
      '*': () => print('home') // all routs lead to home page
    })
    .on('book/:id/note/:noteId', print)
    .resolve();
})