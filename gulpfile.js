// tooling
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const eslit = require('gulp-eslit');
const exec = require('child_process').exec;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const size = require('gulp-size');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const opts = require('./options');

/* Dist (copies files and compiles HTML, JS, and CSS)
/* ========================================================================== */

gulp.task('dist', ['dist:files', 'dist:html', 'dist:css', 'dist:js']);

/* Dist:Files (copies files from placeholders to dist)
/* ========================================================================== */

gulp.task('dist:files', () => opts.paths.files ? gulp.src(
	[`${ opts.paths.files }/*`, `${ opts.paths.files }/**/*`]
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
) : []);

/* Dist:HTML (copies html saturated with eslit to dist)
/* ========================================================================== */

gulp.task('dist:html', () => opts.paths.html ? gulp.src(
	opts.paths.html
).pipe(
	eslit()
).pipe(
	rename('index.html')
).pipe(
	gulp.dest('./dist')
).pipe(
	size({
		gzip: true,
		showFiles: true,
		title: 'Size of:'
	})
).pipe(
	connect.reload()
) : []);

/* Dist:JS (copies js saturated with rollup to dist)
/* ========================================================================== */

gulp.task('dist:js', () => opts.paths.js ? rollup({
	entry: opts.paths.js,
	format: 'iife',
	sourceMap: true,
	plugins: [
		require('rollup-plugin-json')(),
		require('rollup-plugin-node-resolve')(),
		require('rollup-plugin-commonjs')({
			include: 'node_modules/**'
		}),
		require('rollup-plugin-babel')({
			babelrc: false,
			plugins: [
				require('babel-plugin-external-helpers')
			],
			presets: [
				[
					require('babel-preset-env'),
					{
						modules: false
					}
				]
			]
		})
	].concat(
		opts.compresses.js ? require('rollup-plugin-uglify')(opts.compresses.js) : []
	)
}).pipe(
	source(opts.paths.js)
).pipe(
	buffer()
).pipe(
	sourcemaps.init({
		loadMaps: true
	})
).pipe(
	rename('index.js')
).pipe(
	size({
		gzip: true,
		showFiles: true,
		title: 'Size of:'
	})
).pipe(
	sourcemaps.write('.')
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
) : []);

/* Dist:CSS (copies css saturated with postcss and sass to dist)
/* ========================================================================== */

gulp.task('dist:css', () => opts.paths.css ? gulp.src(
	opts.paths.css
).pipe(
	sourcemaps.init()
).pipe(
	gulpif(
		opts.uses.postcss,
		postcss([
			require('postcss-partial-import')(),
			require('postcss-cssnext')({
				autoprefixer: false
			}),
			require('postcss-easings')(),
			require('postcss-short')(),
			require('postcss-svg-fragments')()
		].concat(
			opts.compresses.css ? require('cssnano')(opts.compresses.css) : []
		), {
			syntax: require('postcss-scss')
		})
	)
).pipe(
	gulpif(
		opts.uses.sass,
		sass(opts.compresses.css ? opts.compresses.css.sass : {}).on('error', sass.logError)
	)
).pipe(
	rename('index.css')
).pipe(
	size({
		gzip: true,
		showFiles: true,
		title: 'Size of:'
	})
).pipe(
	sourcemaps.write('.')
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
) : []);

/* Live (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('live', ['dist'], () => {
	gulp.watch([`${ opts.paths.files }/*`, `${ opts.paths.files }/**/*`], ['dist:files']);
	gulp.watch(['*.html', 'dependent-html/*.html', `${ opts.paths.files }/*.html`], ['dist:html']);
	gulp.watch(['*.css', '*.scss', 'dependent-css/*.css', `${ opts.paths.files }/*.css`, `${ opts.paths.files }/*.scss`], ['dist:css']);
	gulp.watch(['*.js', 'dependent-js/*.js', `${ opts.paths.files }/*.js`], ['dist:js']);
});

/* Host (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('host', ['live'], (cb) => {
	connect.server(opts.server);

	if (opts.server.openBrowser) {
		exec(`${ process.platform === 'win32' ? 'start' : 'open' } http${ opts.server.https ? 's' : '' }://${ opts.server.host }:${ opts.server.port }/`, (err) => {
			cb(err);
		});
	}
});

/* Default task is: Host
/* ========================================================================== */

gulp.task('default', ['host']);
