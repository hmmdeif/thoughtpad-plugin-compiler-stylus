var stylus = require('stylus'),
    nib = require('nib');

var init = function (thoughtpad) {
    thoughtpad.subscribe("stylesheet-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "styl") return;

    yield obj.thoughtpad.notify("stylesheet-compile-complete", { contents: stylus(obj.contents).use(nib()).render(), name: obj.name });
};

module.exports = {
    init: init
};