import { jquery } from 'jquery'

$(() => {
  let result = $('#result'),
    router = new Navigo(null, false);

  function print(obj) {
    console.log(JSON.stringify(obj));
  }

  router
    .on('test/?:query', (params) => { 
      print(params);
      print(getQueryParams(params.query));
    })
    .on('book/:id/note/:noteId/?:query', (params) => print(params))
    .on('book/:id/note/:noteId', print)
    .on({
      'book/:id/?:query': params => {
        print(params);
        print(getQueryParams(params.query))
      },
      'book/:id': params => print(params),
      '*': () => print('home')
    }).resolve();


  function getQueryParams(query) {
    let hash, vars = {},
      hashes = query.substr(1)
        .split('&').forEach(val => {
          hash = val.split('=');
          vars[hash[0]] = hash[1];
        });
    return vars;
  }

})