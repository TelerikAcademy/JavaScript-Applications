System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
   'text': 'libs/systemjs-plugin-text/text.js',

   // App files
   'app': 'js/app.js',
   'myRouter': 'js/myRouter.js',
   'requester': 'js/requester.js',
   'data': 'js/data.js',
   'homeController': 'js/controllers/home.js',
   'myCookieController': 'js/controllers/myCookie.js',
   'userController': 'js/controllers/user.js',
   'templates': 'js/templates.js',

   // templates
   // 'homeTemplate': 'templates/home.handlebars',

   // Library files
   'jquery': 'libs/jquery/dist/jquery.min.js',
   'handlebars': 'libs/handlebars/dist/handlebars.amd.js',
   'cryptojs': 'libs/cryptojs/cryptojs.js',
   'toastr': 'libs/toastr/build/toastr.min.js',
 }
});

System.import('app');
