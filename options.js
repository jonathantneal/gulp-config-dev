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
	html:  pathHTML  === false ? pathHTML  : path.resolve(cwd, pathHTML  || `${ pkg.name }.html`),
	js:    pathJS    === false ? pathJS    : path.resolve(cwd, pathJS    || `${ pkg.name }.js`),
	css:   pathCSS   === false ? pathCSS   : path.resolve(cwd, pathCSS   || `${ pkg.name }.css`),
	files: pathFiles === false ? pathFiles : path.resolve(cwd, pathFiles || 'placeholders')
};

// whether sass or css are used
const useSass    = cfg['use-sass']    === false ? false : true; // eslint-disable-line no-unneeded-ternary
const usePostCSS = cfg['use-postcss'] === false ? false : true; // eslint-disable-line no-unneeded-ternary

const uses = {
	sass:    useSass,
	postcss: usePostCSS
};

// whether css or js are compressed
const compressCSS = cfg['compress-css'] === false ? false : Object({
	autoprefixer: false,
	normalizeUrl: false,
	svgo: false,
	sass: {
		outputStyle: 'compressed'
	}
}, cfg['compress-css']);
const compressJS  = cfg['compress-js']  === false ? false : Object({}, cfg['compress-js']);

const compresses = {
	css: compressCSS,
	js:  compressJS
};

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

// configuration options
const htmlDest       = cfg['html-dest']        || 'index.html';
const cssDest        = cfg['css-dest']         || 'index.css';
const cssSyntax      = cfg['css-syntax']       || 'scss';
const jsModuleFormat = cfg['js-module-format'] || 'iife';
const jsModuleName   = cfg['js-module-name']   || false;
const jsDest         = cfg['js-dest']          || 'index.js';

const eslitConfig   = cfg.eslitConfig   || {};
const postcssConfig = cfg.postcssConfig || {};
const rollupConfig  = cfg.rollupConfig  || {};

// server options
const server = Object.assign({
	host:        cfg['server-host'] || 'localhost',
	livereload:  cfg['server-livereload'] || true,
	name:        cfg['server-name'] || pkg.name,
	port:        cfg['server-port'] || 8080,
	openBrowser: cfg['server-browser'] || true,
	root:        cfg['server-root']         || 'dist'
}, cfg['server']);

// return configuration
module.exports = {
	compresses,
	paths,
	uses,
	server,
	watch,
	htmlDest,
	cssDest,
	cssSyntax,
	jsModuleFormat,
	jsModuleName,
	jsDest,
	eslitConfig,
	postcssConfig,
	rollupConfig
};
