# gulp-config-dev [<img src="https://cdn.worldvectorlogo.com/logos/gulp.svg" alt="Gulp" width="40" height="90" align="right">][gulp]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]

[gulp-config-dev] is a shareable configuration package for [gulp].

## Usage

Add [gulp-config-dev] to your project:

```sh
npm install --save-dev gulp-config-dev
```

Then, add this script to your `package.json`:

```json
{
  "scripts": {
    "start": "gulp --cwd . --gulpfile node_modules/gulp-config-dev",
  }
}
```

That’s it. Now you can launch a web server to host your projects, build files, and watch for changes.

```sh
npm start
```

- You can also build files and watch for changes, but not host it.

  ```sh
  npm start live
  ```

- Or, you could just build files.

  ```sh
  npm start dist
  ```

## Configuration

Customize functionality of [gulp-config-dev] from your `package.json`:

```json
{
  "gulpConfig": {
    ...
  }
}
```

- `html`: Path of your primary HTML file. Use `false` to omit HTML. Default is `${package.name}.html`.
- `js`: Path of your primary JS file. Use `false` to omit JS. Default is `${package.name}.js`.
- `css`: Path of your primary CSS file. Use `false` to omit CSS. Default is `${package.name}.css`.
- `files`: Directory of any additional files used by your project. Default is `placeholders`.
- `use-postcss`: Whether to use PostCSS or not. Default is `true`.
- `use-sass`: Whether to use Sass or not. Default is `true`.
- `watch-css`: Array of paths to watch for CSS changes.
- `watch-js`: Array of paths to watch for JS changes.
- `watch-html`: Array of paths to watch for HTML changes.
- `compress-js`: Whether to compress JS or not.
- `compress-css`: Whether to compress CSS or not.
- `server`: Advanced options for [gulp-connect].

## Advanced Configuration

- `server-root`: Destintation of your compiled files. Default is `dist`.
- `server-host`: Name of the server host. Default is `localhost`.
- `server-name`: Name of the server for logging purposes. Default is package name.
- `server-port`: Port to use for the web server. Default is `8080`.
- `server-launch`: Whether to launch the browser. Default is `true`.
- `server-livereload`: Whether to inject livereload. Default is `true`.
- `html-dest`: Destination of your compiled HTML file relative to `server-root`. Default is `index.html`.
- `js-dest`: Destination of your compiled JS file relative to `server-root`. Default is `index.js`.
- `js-module-name`: Name of the JS export, if required. Default is `false`.
- `js-module-format`: Format of the compiled JS. Default is `iife`.
- `css-dest`: Destination of your compiled CSS file relative to `server-root`. Default is `index.css`.
- `css-syntax`: Syntax to use in CSS. Default is `scss`.

[npm-url]: https://www.npmjs.com/package/gulp-config-dev
[npm-img]: https://img.shields.io/npm/v/gulp-config-dev.svg
[cli-url]: https://travis-ci.org/jonathantneal/gulp-config-dev
[cli-img]: https://img.shields.io/travis/jonathantneal/gulp-config-dev.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[gulp]: https://github.com/gulpjs/gulp
[gulp-config-dev]: https://github.com/jonathantneal/gulp-config-dev
[gulp-connect]: https://github.com/AveVlad/gulp-connect
