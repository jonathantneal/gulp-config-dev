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
const useSass = cfg['use-sass'] === false ? false : true; // eslint-disable-line no-unneeded-ternary
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
	css: cfg['watch-css'] === false ? [] : [].concat(cfg['watch-css'] || [
		'*.css',
		'*.scss',
		'dependent-css/*.css',
		'dependent-css/**/*.css',
		'dependent-scss/*.scss',
		'dependent-scss/**/*.scss'
	]),
	js: cfg['watch-js'] === false ? [] : [].concat(cfg['watch-js'] || [
		'*.js',
		'dependent-js/*.js',
		'dependent-js/**/*.js'
	]),
	html: cfg['watch-html'] === false ? [] : [].concat(cfg['watch-html'] || [
		'*.html',
		'dependent-html/*.html',
		'dependent-html/**/*.html'
	]),
	files: pathFiles === false ? [] : [pathFiles || 'placeholders']
};

// server options
const server = Object.assign({
	host: 'localhost',
	livereload: true,
	name: pkg.name,
	port: 8080,
	openBrowser: true,
	root: 'dist'
}, cfg['server']);

// return configuration
module.exports = {
	compresses,
	server,
	paths,
	uses,
	watch
};
