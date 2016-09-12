System.config({
	transpiler: "babel",
	babelOptions: {
		optional: [
			"runtime"
		]
	},
	map: {
		babel: 'node_modules/babel-core/browser.js',
		jquery: 'bower_components/jquery/dist/jquery.js'
	}
});