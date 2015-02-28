thoughtpad-plugin-compiler-stylus
=================================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that responds to Stylesheet compile events. Stylus will be compiled to CSS for use in the browser.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    stylus = require('thoughtpad-plugin-compiler-stylus');

var thoughtpad = man.registerPlugins([stylus]);
thoughtpad.subscribe("stylesheet-compile-complete", function (data) {
    console.log("CSS is returned here"); 
});
yield thoughtpad.notify("stylesheet-compile-request", { ext: "styl", contents: "your stylus code here", name: "name of file" });
```

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-compiler-stylus/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-compiler-stylus
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-compiler-stylus/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-compiler-stylus?branch=master
