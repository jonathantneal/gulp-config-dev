// tooling
const cwd = process.cwd();
const path = require('path');

// package, gulp configuration
const pkg = require(
	path.resolve(
		cwd,
		'package.json'
	)
);
const cfg = pkg.gulpConfig || {};

// paths for html, js, css
const pathHTML  = cfg.html  !== undefined ? cfg.html  : pkg.template;
const pathJS    = cfg.js    !== undefined ? cfg.js    : pkg.main;
const pathCSS   = cfg.css   !== undefined ? cfg.css   : pkg.style;
const pathFiles = cfg.files !== undefined ? cfg.files : 'placeholders';

const paths = {
	html:  pathHTML  === false ? pathHTML  : pathHTML  instanceof Array ? pathHTML.map(resolve)  : path.resolve(cwd, pathHTML  || `${ pkg.name }.html`),
	js:    pathJS    === false ? pathJS    : pathJS    instanceof Array ? pathJS.map(resolve)    : path.resolve(cwd, pathJS    || `${ pkg.name }.js`),
	css:   pathCSS   === false ? pathCSS   : pathCSS   instanceof Array ? pathCSS.map(resolve)   : path.resolve(cwd, pathCSS   || `${ pkg.name }.css`),
	files: pathFiles === false ? pathFiles : pathFiles instanceof Array ? pathFiles.map(resolve) : path.resolve(cwd, pathFiles || 'placeholders')
};

// whether sass or css are used
const useSass    = cfg['use-sass']    === false ? false : true; // eslint-disable-line no-unneeded-ternary
const usePostCSS = cfg['use-postcss'] === false ? false : true; // eslint-disable-line no-unneeded-ternary

const uses = {
	sass:    useSass,
	postcss: usePostCSS
};

// whether or how css or js are compressed
const compressCSS = cfg['compress-css'] === false ? false : Object.assign({
	normalizeUrl: false,
	svgo: false,
	sass: {
		outputStyle: 'compressed'
	}
}, cfg['compress-css']);
const compressJS  = cfg['compress-js']  === false ? false : Object.assign({}, cfg['compress-js']);

// css direction
const cssDir = 'css-dir' in cfg ? cfg['css-dir'] : 'ltr';

// css syntax
const cssSyntax = 'css-syntax' in cfg ? cfg['css-syntax'] : 'scss';

// js module options
const jsModuleFormat = 'js-module-format' in cfg ? cfg['js-module-format'] : 'iife';
const jsModuleName   = 'js-module-name' in cfg   ? cfg['js-module-name']   : false;

// watch file paths
const watch = {
	css: pathCSS === false || cfg['watch-css'] === false ? [] : [].concat(cfg['watch-css'] || [
		pathCSS,
		'*.{css,scss}',
		'dependent-css/**',
		'dependent-scss/**'
	]),
	js: pathJS === false || cfg['watch-js'] === false ? [] : [].concat(cfg['watch-js'] || [
		pathJS,
		'*.{js,json}',
		'dependent-js/**'
	]),
	html: pathHTML === false || cfg['watch-html'] === false ? [] : [].concat(cfg['watch-html'] || [
		pathHTML,
		'*.{html,jsx}',
		'dependent-html/**'
	]),
	files: pathFiles === false ? [] : [`${ pathFiles }/**`]
};

// destinations
const htmlDest = 'html-dest' in cfg ? cfg['html-dest'] : 'index.html';
const cssDest  = 'css-dest' in cfg  ? cfg['css-dest']  : 'index.css';
const jsDest   = 'js-dest' in cfg   ? cfg['js-dest']   : 'index.js';

// more configs
const eslitConfig   = Object.assign({}, cfg.eslitConfig);
const postcssConfig = Object.assign({}, cfg.postcssConfig);
const rollupConfig  = Object.assign({}, cfg.rollupConfig);

// server options
const server = Object.assign({
	host:        'server-host' in cfg       ? cfg['server-host']       : 'localhost',
	livereload:  'server-livereload' in cfg ? cfg['server-livereload'] : true,
	name:        'server-name' in cfg       ? cfg['server-name']       : pkg.name,
	port:        'server-port' in cfg       ? cfg['server-port']       : 8080,
	openBrowser: 'server-browser' in cfg    ? cfg['server-browser']    : true,
	root:        'server-root' in cfg       ? cfg['server-root']       : 'dist'
}, cfg['server']);

// return configuration
module.exports = {
	compressCSS,
	compressJS,
	cssDir,
	cssSyntax,
	jsModuleFormat,
	jsModuleName,
	paths,
	uses,
	server,
	watch,
	htmlDest,
	cssDest,
	jsDest,
	eslitConfig,
	postcssConfig,
	rollupConfig
};

function resolve(each) {
	return path.resolve(cwd, each);
}
