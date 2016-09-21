SystemJS.config({
 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',
 // tell SystemJS where to look for the dependencies
 map: {
  'plugin-babel': 
  './node_modules/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': 
  './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
  // app start script
  'main': './scripts/main.js'
 }
});